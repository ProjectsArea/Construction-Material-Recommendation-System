const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.resolve(__dirname, '../data/buildright.db');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db;

async function initializeDb() {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Create users table with role column if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      company TEXT NOT NULL,
      jobTitle TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create predictions table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS predictions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      budget REAL NOT NULL,
      area_size REAL NOT NULL,
      environmental_type TEXT NOT NULL,
      project_type TEXT NOT NULL,
      soil_type TEXT NOT NULL,
      predicted_material TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // Create admin user if it doesn't exist
  const adminExists = await db.get('SELECT * FROM users WHERE email = ?', ['admin@buildright.com']);
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.run(
      `INSERT INTO users (firstName, lastName, email, password, company, jobTitle, role)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['Admin', 'User', 'admin@buildright.com', hashedPassword, 'BuildRight', 'Administrator', 'admin']
    );
  }
}

// API Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, company, jobTitle } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await db.run(
      `INSERT INTO users (firstName, lastName, email, password, company, jobTitle)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, hashedPassword, company, jobTitle]
    );

    res.status(201).json({ 
      success: true, 
      userId: result.lastID 
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ 
        success: false, 
        error: 'Email already exists' 
      });
    } else {
      console.error('Signup error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'An error occurred during signup' 
      });
    }
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ 
      success: true, 
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An error occurred during login' 
    });
  }
});

// Store prediction endpoint
app.post('/api/predictions', async (req, res) => {
  try {
    const { userId, budget, area_size, environmental_type, project_type, soil_type, predicted_material } = req.body;

    const result = await db.run(
      `INSERT INTO predictions (
        userId, budget, area_size, environmental_type, project_type, soil_type, predicted_material
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, budget, area_size, environmental_type, project_type, soil_type, predicted_material]
    );

    res.status(201).json({
      success: true,
      predictionId: result.lastID
    });
  } catch (error) {
    console.error('Store prediction error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to store prediction'
    });
  }
});

// Get user predictions endpoint
app.get('/api/predictions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const predictions = await db.all(
      `SELECT * FROM predictions WHERE userId = ? ORDER BY createdAt DESC`,
      [userId]
    );

    res.json({
      success: true,
      predictions
    });
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get predictions'
    });
  }
});

// Prediction endpoint
app.post('/api/predict', async (req, res) => {
  try {
    const { budget, area_size, environmental_type, project_type, soil_type } = req.body;

    // Validate input
    if (!budget || !area_size || !environmental_type || !project_type || !soil_type) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Make prediction using Python script
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python', [
      path.resolve(__dirname, '../../app.py'),
      '--budget', budget,
      '--area_size', area_size,
      '--environmental_type', environmental_type,
      '--project_type', project_type,
      '--soil_type', soil_type
    ]);

    let prediction = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      prediction += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python process error:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to get prediction'
        });
      }

      res.json({
        success: true,
        prediction: prediction.trim()
      });
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred during prediction'
    });
  }
});

// Admin API Routes
app.get('/api/admin/users', async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await db.get('SELECT COUNT(*) as count FROM users');
    
    // Get recent users with their details
    const recentUsers = await db.all(`
      SELECT id, firstName, lastName, email, company, jobTitle, createdAt
      FROM users
      ORDER BY createdAt DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      totalUsers: totalUsers.count,
      recentUsers
    });
  } catch (error) {
    console.error('Get users stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get users statistics'
    });
  }
});

app.get('/api/admin/predictions', async (req, res) => {
  try {
    // Get total predictions count
    const totalPredictions = await db.get('SELECT COUNT(*) as count FROM predictions');
    
    // Get recent predictions with user details
    const recentPredictions = await db.all(`
      SELECT 
        p.*,
        u.firstName,
        u.lastName,
        u.email,
        u.company,
        u.jobTitle
      FROM predictions p
      LEFT JOIN users u ON p.userId = u.id
      ORDER BY p.createdAt DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      totalPredictions: totalPredictions.count,
      recentPredictions
    });
  } catch (error) {
    console.error('Get predictions stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get predictions statistics'
    });
  }
});

app.get('/api/admin/details', async (req, res) => {
  try {
    // Get admin user details
    const admin = await db.get('SELECT id, firstName, lastName, email, company, jobTitle, role, createdAt FROM users WHERE role = ?', ['admin']);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'Admin user not found'
      });
    }

    res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Get admin details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get admin details'
    });
  }
});

// Initialize database and start server
initializeDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}); 