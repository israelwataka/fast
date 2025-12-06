import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const testimonials = await query('SELECT * FROM testimonials ORDER BY order_position ASC');
        return res.status(200).json(testimonials);

      case 'POST':
        const { name, position, content, image, rating, order_position, is_active } = req.body;

        if (!name || !content) {
          return res.status(400).json({ error: 'Name and content are required' });
        }

        const result = await query(
          'INSERT INTO testimonials (name, position, content, image, rating, order_position, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, position || '', content, image || '', rating || 5, order_position || 0, is_active !== false]
        );

        return res.status(201).json({ id: result.insertId, message: 'Testimonial created successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Testimonials API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default function testimonialsHandler(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireAuth(handler)(req, res);
}
