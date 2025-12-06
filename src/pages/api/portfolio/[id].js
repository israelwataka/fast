import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        const items = await query('SELECT * FROM portfolio_items WHERE id = ?', [id]);
        if (items.length === 0) {
          return res.status(404).json({ error: 'Item not found' });
        }
        return res.status(200).json(items[0]);

      case 'PUT':
        const { title, description, category, images, client, date, url, order_position, is_active } = req.body;

        await query(
          'UPDATE portfolio_items SET title = ?, description = ?, category = ?, images = ?, client = ?, date = ?, url = ?, order_position = ?, is_active = ? WHERE id = ?',
          [title, description, category || '', JSON.stringify(images || []), client || '', date || '', url || '', order_position || 0, is_active !== false, id]
        );

        return res.status(200).json({ message: 'Portfolio item updated successfully' });

      case 'DELETE':
        await query('DELETE FROM portfolio_items WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Portfolio item deleted successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Portfolio API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default requireAuth(handler);
