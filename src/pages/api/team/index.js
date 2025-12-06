import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const members = await query('SELECT * FROM team_members ORDER BY order_position ASC');
        return res.status(200).json(members);

      case 'POST':
        const { name, position, bio, image, social_links, order_position, is_active } = req.body;

        if (!name || !position) {
          return res.status(400).json({ error: 'Name and position are required' });
        }

        const result = await query(
          'INSERT INTO team_members (name, position, bio, image, social_links, order_position, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, position, bio || '', image || '', JSON.stringify(social_links || {}), order_position || 0, is_active !== false]
        );

        return res.status(201).json({ id: result.insertId, message: 'Team member created successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Team API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default function teamHandler(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireAuth(handler)(req, res);
}
