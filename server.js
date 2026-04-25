const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_super_secret_key_change_this';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/admin', express.static('admin'));

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadMultiple = upload.array('images', 5);

// Initialize database
const db = new Database('database.sqlite');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    whatsapp TEXT,
    shop_name TEXT,
    is_admin INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    whatsapp TEXT,
    shop_name TEXT,
    condition TEXT DEFAULT 'used',
    is_featured INTEGER DEFAULT 0,
    images TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
  )
`);

// Create admin user
const adminExists = db.prepare("SELECT * FROM users WHERE email = 'admin@marketplace.com'").get();
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare("INSERT INTO users (username, email, password, is_admin) VALUES (?, ?, ?, ?)").run('Admin', 'admin@marketplace.com', hashedPassword, 1);
  console.log('✅ Admin created');
}

// ========== AUTH ROUTES ==========
app.post('/api/register', (req, res) => {
  const { username, email, password, whatsapp, shop_name } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, email, password, whatsapp, shop_name) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(username, email, hashedPassword, whatsapp || '', shop_name || '');
    const token = jwt.sign({ id: result.lastInsertRowid, username, isAdmin: 0 }, JWT_SECRET);
    res.json({ token, user: { id: result.lastInsertRowid, username, email, whatsapp, shop_name, isAdmin: 0 } });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
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
app.get('/api/products', (req, res) => {
  const { category, search, minPrice, maxPrice, condition } = req.query;
  
  let query = `
    SELECT p.*, u.username, u.email, u.whatsapp as seller_whatsapp, u.shop_name as seller_shop
    FROM products p 
    JOIN users u ON p.user_id = u.id
    WHERE p.status = 'active'
  `;
  let params = [];
  
  if (category && category !== 'all') {
    query += ' AND p.category = ?';
    params.push(category);
  }
  
  if (search && search.trim() !== '') {
    query += ' AND (p.title LIKE ? OR p.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  if (minPrice && minPrice !== '') {
    query += ' AND p.price >= ?';
    params.push(parseFloat(minPrice));
  }
  if (maxPrice && maxPrice !== '') {
    query += ' AND p.price <= ?';
    params.push(parseFloat(maxPrice));
  }
  if (condition && condition !== 'all') {
    query += ' AND p.condition = ?';
    params.push(condition);
  }
  
  query += ' ORDER BY p.is_featured DESC, p.created_at DESC';
  
  try {
    const stmt = db.prepare(query);
    const rows = params.length > 0 ? stmt.all(...params) : stmt.all();
    rows.forEach(row => {
      if (row.images) {
        try {
          row.images = JSON.parse(row.images);
        } catch(e) {
          row.images = [];
        }
      } else {
        row.images = [];
      }
    });
    res.json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/my-products', authenticateToken, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
    rows.forEach(row => {
      if (row.images) {
        try {
          row.images = JSON.parse(row.images);
        } catch(e) {
          row.images = [];
        }
      }
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', authenticateToken, (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'Image upload error: ' + err.message });
    }
    
    const { title, price, category, location, description, whatsapp, shop_name, condition } = req.body;
    
    if (!title || !price || !category || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const imagesJson = JSON.stringify(imageUrls);
    
    try {
      const stmt = db.prepare(`INSERT INTO products (user_id, title, price, category, location, description, whatsapp, shop_name, condition, images, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`);
      const result = stmt.run(req.user.id, title, parseFloat(price), category, location, description || '', whatsapp || '', shop_name || '', condition || 'used', imagesJson);
      res.json({ id: result.lastInsertRowid, message: 'Product created, waiting for admin approval', images: imageUrls });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

app.delete('/api/products/:id', authenticateToken, (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.user_id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== FAVORITES ROUTES ==========
app.post('/api/favorites/:productId', authenticateToken, (req, res) => {
  try {
    db.prepare('INSERT OR IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)').run(req.user.id, req.params.productId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/favorites/:productId', authenticateToken, (req, res) => {
  try {
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND product_id = ?').run(req.user.id, req.params.productId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/favorites', authenticateToken, (req, res) => {
  try {
    const rows = db.prepare(`SELECT p.*, u.username, u.email FROM favorites f
      JOIN products p ON f.product_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE f.user_id = ? AND p.status = 'active'
      ORDER BY f.created_at DESC`).all(req.user.id);
    rows.forEach(row => {
      if (row.images) {
        try {
          row.images = JSON.parse(row.images);
        } catch(e) {
          row.images = [];
        }
      }
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== ADMIN ROUTES ==========
app.get('/api/admin/stats', authenticateToken, requireAdmin, (req, res) => {
  try {
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
    const totalAds = db.prepare('SELECT COUNT(*) as count FROM products').get();
    const pendingAds = db.prepare('SELECT COUNT(*) as count FROM products WHERE status = "pending"').get();
    const activeAds = db.prepare('SELECT COUNT(*) as count FROM products WHERE status = "active"').get();
    res.json({
      totalUsers: totalUsers.count,
      totalAds: totalAds.count,
      pendingAds: pendingAds.count,
      activeAds: activeAds.count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  try {
    const rows = db.prepare('SELECT id, username, email, whatsapp, shop_name, is_admin, created_at FROM users ORDER BY created_at DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM favorites WHERE user_id = ?').run(req.params.id);
    db.prepare('DELETE FROM products WHERE user_id = ?').run(req.params.id);
    db.prepare('DELETE FROM users WHERE id = ? AND is_admin = 0').run(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/all-products', authenticateToken, requireAdmin, (req, res) => {
  try {
    const rows = db.prepare(`SELECT p.*, u.username FROM products p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC`).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/pending-products', authenticateToken, requireAdmin, (req, res) => {
  try {
    const rows = db.prepare(`SELECT p.*, u.username FROM products p JOIN users u ON p.user_id = u.id WHERE p.status = 'pending' ORDER BY p.created_at DESC`).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/products/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM favorites WHERE product_id = ?').run(req.params.id);
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/products/:id/approve', authenticateToken, requireAdmin, (req, res) => {
  try {
    db.prepare('UPDATE products SET status = "active" WHERE id = ?').run(req.params.id);
    res.json({ message: 'Product approved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 SERVER RUNNING`);
  console.log(`========================================`);
  console.log(`📱 Website: http://localhost:${PORT}`);
  console.log(`👑 Admin: http://localhost:${PORT}/admin/admin.html`);
  console.log(`📧 Admin Login: admin@marketplace.com / admin123`);
  console.log(`========================================\n`);
});