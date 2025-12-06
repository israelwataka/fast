import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        const testimonials = await query('SELECT * FROM testimonials WHERE id = ?', [id]);
        if (testimonials.length === 0) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }
        return res.status(200).json(testimonials[0]);

      case 'PUT':
        const { name, position, content, image, rating, order_position, is_active } = req.body;

        await query(
          'UPDATE testimonials SET name = ?, position = ?, content = ?, image = ?, rating = ?, order_position = ?, is_active = ? WHERE id = ?',
          [name, position || '', content, image || '', rating || 5, order_position || 0, is_active !== false, id]
        );

        return res.status(200).json({ message: 'Testimonial updated successfully' });

      case 'DELETE':
        await query('DELETE FROM testimonials WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Testimonial deleted successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Testimonials API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default requireAuth(handler);
