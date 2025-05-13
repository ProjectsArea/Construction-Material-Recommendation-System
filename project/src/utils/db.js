import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Database file path
const dbPath = path.resolve(__dirname, '../../data/buildright.db');

// Initialize database connection
let db = null;

export async function getDb() {
  if (db) return db;
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Create users table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      company TEXT NOT NULL,
      jobTitle TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

export async function createUser(userData) {
  const db = await getDb();
  const { firstName, lastName, email, password, company, jobTitle } = userData;
  
  try {
    const result = await db.run(
      `INSERT INTO users (firstName, lastName, email, password, company, jobTitle)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, password, company, jobTitle]
    );
    return result.lastID;
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      throw new Error('Email already exists');
    }
    throw error;
  }
}

export async function getUserByEmail(email) {
  const db = await getDb();
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
} 