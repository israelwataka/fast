import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        const services = await query('SELECT * FROM services WHERE id = ?', [id]);
        if (services.length === 0) {
          return res.status(404).json({ error: 'Service not found' });
        }
        return res.status(200).json(services[0]);

      case 'PUT':
        const { title, description, icon, image, features, order_position, is_active } = req.body;

        await query(
          'UPDATE services SET title = ?, description = ?, icon = ?, image = ?, features = ?, order_position = ?, is_active = ? WHERE id = ?',
          [title, description, icon || '', image || '', JSON.stringify(features || []), order_position || 0, is_active !== false, id]
        );

        return res.status(200).json({ message: 'Service updated successfully' });

      case 'DELETE':
        await query('DELETE FROM services WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Service deleted successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Service API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default requireAuth(handler);
