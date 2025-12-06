import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const services = await query(
          'SELECT * FROM services ORDER BY order_position ASC'
        );
        return res.status(200).json(services);

      case 'POST':
        const { title, description, icon, image, features, order_position, is_active } = req.body;

        if (!title || !description) {
          return res.status(400).json({ error: 'Title and description are required' });
        }

        const result = await query(
          'INSERT INTO services (title, description, icon, image, features, order_position, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [title, description, icon || '', image || '', JSON.stringify(features || []), order_position || 0, is_active !== false]
        );

        return res.status(201).json({ id: result.insertId, message: 'Service created successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Services API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default function servicesHandler(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireAuth(handler)(req, res);
}
