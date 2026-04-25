const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
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

const db = new sqlite3.Database('database.sqlite');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    whatsapp TEXT,
    shop_name TEXT,
    is_admin INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
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
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id),
    UNIQUE(user_id, product_id)
  )`);

  // Create admin user
  db.get("SELECT * FROM users WHERE email = 'admin@marketplace.com'", async (err, user) => {
    if (!user) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      db.run("INSERT INTO users (username, email, password, is_admin) VALUES (?, ?, ?, ?)",
        ['Admin', 'admin@marketplace.com', hashedPassword, 1]);
      console.log('✅ Admin created: admin@marketplace.com / admin123');
    }
  });
});

// Add sample products if none exist
db.get("SELECT COUNT(*) as count FROM products WHERE status = 'active'", [], (err, row) => {
  if (!err && row && row.count === 0) {
    db.get("SELECT id FROM users WHERE is_admin = 1", [], (err, admin) => {
      const userId = admin ? admin.id : 1;
      
      const sampleProducts = [
        { title: 'iPhone 14 Pro', price: 999, category: 'Electronics', location: 'Kabul', description: 'Like new, 256GB', condition: 'like-new', whatsapp: '0781234567', shop_name: 'Tech Store' },
        { title: 'Samsung Galaxy S23', price: 850, category: 'Electronics', location: 'Herat', description: 'Brand new', condition: 'new', whatsapp: '0781234568', shop_name: 'Mobile Center' },
        { title: 'Modern Sofa', price: 350, category: 'Furniture', location: 'Herat', description: 'Comfortable fabric sofa', condition: 'new', whatsapp: '0798765432', shop_name: 'Home Furniture' },
        { title: 'Wooden Dining Table', price: 250, category: 'Furniture', location: 'Kabul', description: '6-seater', condition: 'used', whatsapp: '0798765433', shop_name: '' },
        { title: 'Toyota Corolla 2020', price: 15000, category: 'Cars', location: 'Mazar', description: 'Good condition, low mileage', condition: 'used', whatsapp: '0700123456', shop_name: 'Auto Gallery' },
        { title: 'Honda Civic 2019', price: 13500, category: 'Cars', location: 'Kabul', description: 'Excellent condition', condition: 'used', whatsapp: '0700123457', shop_name: '' },
        { title: 'Nike Air Max', price: 120, category: 'Fashion', location: 'Kandahar', description: 'Original, size 42', condition: 'new', whatsapp: '0711223344', shop_name: 'Sport Shop' },
        { title: 'Gucci Bag', price: 450, category: 'Fashion', location: 'Kabul', description: 'Authentic', condition: 'like-new', whatsapp: '0711223345', shop_name: 'Luxury Store' }
      ];
      
      sampleProducts.forEach(p => {
        db.run(`INSERT INTO products (user_id, title, price, category, location, description, condition, whatsapp, shop_name, status, images)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?)`,
          [userId, p.title, p.price, p.category, p.location, p.description, p.condition, p.whatsapp, p.shop_name, JSON.stringify([])]);
      });
      console.log('✅ Sample products added for testing!');
    });
  }
});

// ========== AUTH ROUTES ==========
app.post('/api/register', async (req, res) => {
  const { username, email, password, whatsapp, shop_name } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (username, email, password, whatsapp, shop_name) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, whatsapp || '', shop_name || ''],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Username or email already exists' });
          }
          return res.status(500).json({ error: err.message });
        }
        const token = jwt.sign({ id: this.lastID, username, isAdmin: 0 }, JWT_SECRET);
        res.json({ token, user: { id: this.lastID, username, email, whatsapp, shop_name, isAdmin: 0 } });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.is_admin || 0 }, JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email, whatsapp: user.whatsapp, shop_name: user.shop_name, isAdmin: user.is_admin || 0 } });
  });
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

// ========== PRODUCT ROUTES - FIXED CATEGORY FILTERING ==========
app.get('/api/products', (req, res) => {
  const { category, search, minPrice, maxPrice, condition } = req.query;
  
  console.log('========== PRODUCT REQUEST ==========');
  console.log('Category requested:', category);
  
  let query = `
    SELECT p.*, u.username, u.email, u.whatsapp as seller_whatsapp, u.shop_name as seller_shop
    FROM products p 
    JOIN users u ON p.user_id = u.id
    WHERE p.status = 'active'
  `;
  let params = [];
  
  // CRITICAL FIX: Category filter - exact match
  if (category && category !== 'all' && category !== 'undefined' && category !== 'null') {
    query += ' AND p.category = ?';
    params.push(category);
    console.log('FILTERING BY CATEGORY:', category);
  } else {
    console.log('Showing ALL categories');
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
  if (condition && condition !== 'all' && condition !== 'undefined') {
    query += ' AND p.condition = ?';
    params.push(condition);
  }
  
  query += ' ORDER BY p.created_at DESC';
  
  console.log('SQL Query:', query);
  console.log('Params:', params);
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    
    console.log(`Found ${rows.length} products`);
    
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
  });
});

app.get('/api/my-products', authenticateToken, (req, res) => {
  db.all('SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
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
  });
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
    
    db.run(
      `INSERT INTO products (user_id, title, price, category, location, description, whatsapp, shop_name, condition, images, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [req.user.id, title, parseFloat(price), category, location, description || '', whatsapp || '', shop_name || '', condition || 'used', imagesJson],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: 'Product created, waiting for admin approval', images: imageUrls });
      }
    );
  });
});

app.delete('/api/products/:id', authenticateToken, (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, product) => {
    if (err || !product) return res.status(404).json({ error: 'Product not found' });
    if (product.user_id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product deleted' });
    });
  });
});

// ========== FAVORITES ROUTES ==========
app.post('/api/favorites/:productId', authenticateToken, (req, res) => {
  db.run('INSERT OR IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)',
    [req.user.id, req.params.productId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.delete('/api/favorites/:productId', authenticateToken, (req, res) => {
  db.run('DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
    [req.user.id, req.params.productId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.get('/api/favorites', authenticateToken, (req, res) => {
  db.all(`SELECT p.*, u.username, u.email FROM favorites f
          JOIN products p ON f.product_id = p.id
          JOIN users u ON p.user_id = u.id
          WHERE f.user_id = ? AND p.status = 'active'
          ORDER BY f.created_at DESC`, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
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
  });
});

// ========== ADMIN ROUTES ==========
app.get('/api/admin/stats', authenticateToken, requireAdmin, (req, res) => {
  db.get('SELECT COUNT(*) as totalUsers FROM users', [], (err, users) => {
    db.get('SELECT COUNT(*) as totalAds FROM products', [], (err, ads) => {
      db.get('SELECT COUNT(*) as pendingAds FROM products WHERE status = "pending"', [], (err, pending) => {
        db.get('SELECT COUNT(*) as activeAds FROM products WHERE status = "active"', [], (err, active) => {
          res.json({
            totalUsers: users?.totalUsers || 0,
            totalAds: ads?.totalAds || 0,
            pendingAds: pending?.pendingAds || 0,
            activeAds: active?.activeAds || 0
          });
        });
      });
    });
  });
});

app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  db.all('SELECT id, username, email, whatsapp, shop_name, is_admin, created_at FROM users ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, (req, res) => {
  db.run('DELETE FROM favorites WHERE user_id = ?', [req.params.id], () => {
    db.run('DELETE FROM products WHERE user_id = ?', [req.params.id], () => {
      db.run('DELETE FROM users WHERE id = ? AND is_admin = 0', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
      });
    });
  });
});

app.get('/api/admin/all-products', authenticateToken, requireAdmin, (req, res) => {
  db.all(`SELECT p.*, u.username FROM products p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.get('/api/admin/pending-products', authenticateToken, requireAdmin, (req, res) => {
  db.all(`SELECT p.*, u.username FROM products p JOIN users u ON p.user_id = u.id WHERE p.status = 'pending' ORDER BY p.created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.delete('/api/admin/products/:id', authenticateToken, requireAdmin, (req, res) => {
  db.run('DELETE FROM favorites WHERE product_id = ?', [req.params.id], () => {
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product deleted' });
    });
  });
});

app.put('/api/admin/products/:id/approve', authenticateToken, requireAdmin, (req, res) => {
  db.run('UPDATE products SET status = "active" WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product approved' });
  });
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