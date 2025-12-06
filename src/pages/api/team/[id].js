import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        const members = await query('SELECT * FROM team_members WHERE id = ?', [id]);
        if (members.length === 0) {
          return res.status(404).json({ error: 'Team member not found' });
        }
        return res.status(200).json(members[0]);

      case 'PUT':
        const { name, position, bio, image, social_links, order_position, is_active } = req.body;

        await query(
          'UPDATE team_members SET name = ?, position = ?, bio = ?, image = ?, social_links = ?, order_position = ?, is_active = ? WHERE id = ?',
          [name, position, bio || '', image || '', JSON.stringify(social_links || {}), order_position || 0, is_active !== false, id]
        );

        return res.status(200).json({ message: 'Team member updated successfully' });

      case 'DELETE':
        await query('DELETE FROM team_members WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Team member deleted successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Team API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default requireAuth(handler);
