const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_super_secret_key_change_this';

// Supabase configuration
const supabaseUrl = 'https://mvpjdsbhwwhflnowakwh.supabase.co';
const supabaseKey = 'sb_publishable_ZLg_0KhKXcnCNNayUKHNKA_BaaTG0o_';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/admin', express.static('admin'));


// Only create uploads folder when running locally, not on Vercel
const isVercel = process.env.VERCEL === '1';
if (!isVercel) {
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }
}

// Multer configuration - skip on Vercel
let upload, uploadMultiple;

if (!isVercel) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });
  upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
  uploadMultiple = upload.array('images', 5);
} else {
  // On Vercel, create a dummy multer that rejects uploads
  upload = multer({ storage: multer.memoryStorage() });
  uploadMultiple = upload.array('images', 5);
}
// ========== AUTH ROUTES ==========
app.post('/api/register', async (req, res) => {
  const { username, email, password, whatsapp, shop_name } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, password: hashedPassword, whatsapp, shop_name, is_admin: 0 }])
      .select()
      .single();
    
    if (error) throw error;
    
    const token = jwt.sign({ id: data.id, username, isAdmin: 0 }, JWT_SECRET);
    res.json({ token, user: { id: data.id, username, email, whatsapp, shop_name, isAdmin: 0 } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.is_admin || 0 }, JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email, whatsapp: user.whatsapp, shop_name: user.shop_name, isAdmin: user.is_admin || 0 } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// ========== PRODUCT ROUTES ==========
app.get('/api/products', async (req, res) => {
  const { category, search, minPrice, maxPrice, condition } = req.query;
  
  let query = supabase
    .from('products')
    .select(`
      *,
      users (username, email, whatsapp, shop_name)
    `)
    .eq('status', 'active');
  
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  
  if (search && search.trim() !== '') {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }
  
  if (minPrice && minPrice !== '') {
    query = query.gte('price', parseFloat(minPrice));
  }
  
  if (maxPrice && maxPrice !== '') {
    query = query.lte('price', parseFloat(maxPrice));
  }
  
  if (condition && condition !== 'all') {
    query = query.eq('condition', condition);
  }
  
  query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
  
  const { data, error } = await query;
  
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  
  const formattedData = data.map(row => ({
    ...row,
    username: row.users?.username,
    email: row.users?.email,
    seller_whatsapp: row.users?.whatsapp,
    seller_shop: row.users?.shop_name,
    images: row.images ? JSON.parse(row.images) : []
  }));
  
  res.json(formattedData);
});

app.get('/api/my-products', authenticateToken, async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });
  
  if (error) return res.status(500).json({ error: error.message });
  
  data.forEach(row => {
    if (row.images) {
      try {
        row.images = JSON.parse(row.images);
      } catch(e) {
        row.images = [];
      }
    }
  });
  
  res.json(data);
});

app.post('/api/products', authenticateToken, (req, res) => {
  uploadMultiple(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Image upload error: ' + err.message });
    }
    
    const { title, price, category, location, description, whatsapp, shop_name, condition } = req.body;
    
    if (!title || !price || !category || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const imagesJson = JSON.stringify(imageUrls);
    
    const { data, error } = await supabase
      .from('products')
      .insert([{
        user_id: req.user.id,
        title,
        price: parseFloat(price),
        category,
        location,
        description: description || '',
        whatsapp: whatsapp || '',
        shop_name: shop_name || '',
        condition: condition || 'used',
        images: imagesJson,
        status: 'pending'
      }])
      .select()
      .single();
    
    if (error) return res.status(500).json({ error: error.message });
    
    res.json({ id: data.id, message: 'Product created, waiting for admin approval', images: imageUrls });
  });
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  const { data: product } = await supabase
    .from('products')
    .select('user_id')
    .eq('id', req.params.id)
    .single();
  
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (product.user_id !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', req.params.id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Product deleted' });
});

// ========== FAVORITES ROUTES ==========
app.post('/api/favorites/:productId', authenticateToken, async (req, res) => {
  const { error } = await supabase
    .from('favorites')
    .insert([{ user_id: req.user.id, product_id: req.params.productId }]);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.delete('/api/favorites/:productId', authenticateToken, async (req, res) => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', req.user.id)
    .eq('product_id', req.params.productId);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.get('/api/favorites', authenticateToken, async (req, res) => {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      products (*)
    `)
    .eq('user_id', req.user.id);
  
  if (error) return res.status(500).json({ error: error.message });
  
  const products = data.map(item => item.products);
  res.json(products);
});

// ========== ADMIN ROUTES ==========
app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
  const { count: totalUsers } = await supabase.from('users').select('*', { count: 'exact', head: true });
  const { count: totalAds } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: pendingAds } = await supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'pending');
  const { count: activeAds } = await supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'active');
  
  res.json({
    totalUsers: totalUsers || 0,
    totalAds: totalAds || 0,
    pendingAds: pendingAds || 0,
    activeAds: activeAds || 0
  });
});

app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, whatsapp, shop_name, is_admin, created_at')
    .order('created_at', { ascending: false });
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  await supabase.from('favorites').delete().eq('user_id', req.params.id);
  await supabase.from('products').delete().eq('user_id', req.params.id);
  const { error } = await supabase.from('users').delete().eq('id', req.params.id).eq('is_admin', 0);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'User deleted' });
});

app.get('/api/admin/all-products', authenticateToken, requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      users (username)
    `)
    .order('created_at', { ascending: false });
  
  if (error) return res.status(500).json({ error: error.message });
  
  const formatted = data.map(row => ({
    ...row,
    username: row.users?.username
  }));
  
  res.json(formatted);
});

app.get('/api/admin/pending-products', authenticateToken, requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      users (username)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  
  if (error) return res.status(500).json({ error: error.message });
  
  const formatted = data.map(row => ({
    ...row,
    username: row.users?.username
  }));
  
  res.json(formatted);
});

app.delete('/api/admin/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  await supabase.from('favorites').delete().eq('product_id', req.params.id);
  const { error } = await supabase.from('products').delete().eq('id', req.params.id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Product deleted' });
});

app.put('/api/admin/products/:id/approve', authenticateToken, requireAdmin, async (req, res) => {
  const { error } = await supabase
    .from('products')
    .update({ status: 'active' })
    .eq('id', req.params.id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Product approved' });
});

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 SERVER RUNNING`);
  console.log(`========================================`);
  console.log(`📱 Website: http://localhost:${PORT}`);
  console.log(`👑 Admin: http://localhost:${PORT}/admin/admin.html`);
  console.log(`📧 Admin Login: admin@marketplace.com / admin123`);
  console.log(`💾 Database: Supabase (PostgreSQL)`);
  console.log(`========================================\n`);
});