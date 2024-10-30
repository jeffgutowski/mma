import fs from 'fs/promises';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createTables = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS fighters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    record VARCHAR(50) NOT NULL,
    weight VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS fights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fighter1_id INT NOT NULL,
    fighter2_id INT NOT NULL,
    eventDate DATE NOT NULL,
    weightClass VARCHAR(100) NOT NULL,
    fighter1_votes INT DEFAULT 0,
    fighter2_votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (fighter1_id) REFERENCES fighters(id),
    FOREIGN KEY (fighter2_id) REFERENCES fighters(id)
  );
`;

async function install() {
  try {
    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    console.log('Connected to MySQL database');

    // Create tables
    await connection.query(createTables);
    console.log('Database tables created successfully');

    // Create default admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
    await connection.query(
      'INSERT INTO users (email, password, isAdmin) VALUES (?, ?, true)',
      [process.env.ADMIN_EMAIL || 'admin@example.com', hashedPassword]
    );
    console.log('Default admin user created');

    // Create .htaccess file for Apache
    const htaccess = `
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    `;
    await fs.writeFile('.htaccess', htaccess);
    console.log('.htaccess file created');

    await connection.end();
    console.log('Installation completed successfully');
  } catch (error) {
    console.error('Installation failed:', error);
    process.exit(1);
  }
}

install();