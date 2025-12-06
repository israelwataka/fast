import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const items = await query('SELECT * FROM portfolio_items ORDER BY order_position ASC');
        return res.status(200).json(items);

      case 'POST':
        const { title, description, category, images, client, date, url, order_position, is_active } = req.body;

        if (!title || !description) {
          return res.status(400).json({ error: 'Title and description are required' });
        }

        const result = await query(
          'INSERT INTO portfolio_items (title, description, category, images, client, date, url, order_position, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [title, description, category || '', JSON.stringify(images || []), client || '', date || '', url || '', order_position || 0, is_active !== false]
        );

        return res.status(201).json({ id: result.insertId, message: 'Portfolio item created successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Portfolio API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default function portfolioHandler(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireAuth(handler)(req, res);
}
