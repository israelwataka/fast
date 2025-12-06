import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const posts = await query('SELECT * FROM blog_posts ORDER BY created_at DESC');
        return res.status(200).json(posts);

      case 'POST':
        const { title, slug, content, excerpt, featured_image, author, category, tags, is_published } = req.body;

        if (!title || !content) {
          return res.status(400).json({ error: 'Title and content are required' });
        }

        const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const result = await query(
          'INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author, category, tags, is_published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [title, finalSlug, content, excerpt || '', featured_image || '', author || 'Admin', category || 'General', JSON.stringify(tags || []), is_published || false, is_published ? new Date() : null]
        );

        return res.status(201).json({ id: result.insertId, message: 'Post created successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Blog API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default function blogHandler(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return requireAuth(handler)(req, res);
}
