const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://mvpjdsbhwwhflnowakwh.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_ZLg_0KhKXcnCNNayUKHNKA_BaaTG0o_';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running on Vercel!' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Products endpoint
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(10);
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;