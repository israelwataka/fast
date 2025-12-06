import { verifyToken } from '../../../lib/auth';
import { query } from '../../../lib/db';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const users = await query(
      'SELECT id, email, name FROM admin_users WHERE id = ?',
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    return res.status(200).json({ user: users[0] });
  } catch (error) {
    console.error('Auth check error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
