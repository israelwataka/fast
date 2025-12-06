import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const faqs = await query('SELECT * FROM faqs ORDER BY order_position ASC');
        return res.status(200).json(faqs);

      case 'POST':
        const { question, answer, category, order_position, is_active } = req.body;

        if (!question || !answer) {
          return res.status(400).json({ error: 'Question and answer are required' });
        }

        const result = await query(
          'INSERT INTO faqs (question, answer, category, order_position, is_active) VALUES (?, ?, ?, ?, ?)',
          [question, answer, category || 'General', order_position || 0, is_active !== false]
        );

        return res.status(201).json({ id: result.insertId, message: 'FAQ created successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('FAQs API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default function faqsHandler(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireAuth(handler)(req, res);
}
