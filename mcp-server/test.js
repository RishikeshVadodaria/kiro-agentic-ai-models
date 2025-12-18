#!/usr/bin/env node

import Database from 'better-sqlite3';

// Create a test database
const db = new Database(':memory:');

// Create a sample table
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE
  )
`);

// Insert sample data
const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
insert.run('John Doe', 'john@example.com');
insert.run('Jane Smith', 'jane@example.com');

// Query data
const select = db.prepare('SELECT * FROM users');
const users = select.all();

console.log('Sample data:', JSON.stringify(users, null, 2));

db.close();
console.log('SQLite test completed successfully!');