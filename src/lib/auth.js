import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function createAdminIfNotExists() {
  try {
    const users = await query(
      'SELECT id FROM admin_users WHERE email = ?',
      ['admin@highwayautosolutions.com']
    );

    if (users.length === 0) {
      const hashedPassword = await hashPassword('Vision@2030');
      await query(
        'INSERT INTO admin_users (email, password, name) VALUES (?, ?, ?)',
        ['admin@highwayautosolutions.com', hashedPassword, 'Admin']
      );
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}
