import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        const faqs = await query('SELECT * FROM faqs WHERE id = ?', [id]);
        if (faqs.length === 0) {
          return res.status(404).json({ error: 'FAQ not found' });
        }
        return res.status(200).json(faqs[0]);

      case 'PUT':
        const { question, answer, category, order_position, is_active } = req.body;

        await query(
          'UPDATE faqs SET question = ?, answer = ?, category = ?, order_position = ?, is_active = ? WHERE id = ?',
          [question, answer, category || 'General', order_position || 0, is_active !== false, id]
        );

        return res.status(200).json({ message: 'FAQ updated successfully' });

      case 'DELETE':
        await query('DELETE FROM faqs WHERE id = ?', [id]);
        return res.status(200).json({ message: 'FAQ deleted successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('FAQs API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default requireAuth(handler);
