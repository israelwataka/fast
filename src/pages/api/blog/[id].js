import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        const posts = await query('SELECT * FROM blog_posts WHERE id = ?', [id]);
        if (posts.length === 0) {
          return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json(posts[0]);

      case 'PUT':
        const { title, slug, content, excerpt, featured_image, author, category, tags, is_published } = req.body;

        await query(
          'UPDATE blog_posts SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, author = ?, category = ?, tags = ?, is_published = ?, published_at = ? WHERE id = ?',
          [title, slug, content, excerpt || '', featured_image || '', author || 'Admin', category || 'General', JSON.stringify(tags || []), is_published || false, is_published ? new Date() : null, id]
        );

        return res.status(200).json({ message: 'Post updated successfully' });

      case 'DELETE':
        await query('DELETE FROM blog_posts WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Post deleted successfully' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Blog API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default requireAuth(handler);
