import { verifyToken } from './auth';
import cookie from 'cookie';

export function requireAuth(handler) {
  return async (req, res) => {
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

      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
