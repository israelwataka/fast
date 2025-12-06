# Admin Panel Guide

Welcome to your Highway Auto Solutions Content Management System!

## Getting Started

### 1. Create Your Admin Account

First, you need to create an admin account in Supabase:

1. Go to your Supabase dashboard at https://app.supabase.com
2. Select your project
3. Click on "Authentication" in the left sidebar
4. Click "Add user" and create a new user with email and password
5. This will be your admin login credentials

### 2. Access the Admin Panel

1. Navigate to `/admin/login` on your website
2. Enter the email and password you created in Supabase
3. Click "Sign In"

## Admin Panel Features

### Dashboard
- View statistics for all content types
- Quick access to all management sections
- Real-time content counts

### Services Management
**Location:** `/admin/services`

Manage your automotive services:
- Add new services
- Edit existing services
- Delete services
- Set display order
- Toggle active/inactive status

**Fields:**
- Title (required)
- Description (required)
- Icon URL
- Image URL
- Order Position
- Active status

### Blog Management
**Location:** `/admin/blog`

Create and manage blog posts:
- Write new posts
- Edit published posts
- Set publish status
- Organize by categories

**Fields:**
- Title (required)
- Slug (auto-generated)
- Content (required)
- Excerpt
- Featured Image URL
- Author
- Category
- Publish status

### Portfolio Management
**Location:** `/admin/portfolio`

Showcase your work:
- Add portfolio items
- Edit project details
- Set categories
- Toggle visibility

**Fields:**
- Title (required)
- Description (required)
- Category
- Client name
- Project date
- Active status

### Team Management
**Location:** `/admin/team`

Manage team members:
- Add team members
- Edit member profiles
- Set display order
- Toggle visibility

**Fields:**
- Name (required)
- Position (required)
- Bio
- Image URL
- Active status

### Testimonials Management
**Location:** `/admin/testimonials`

Manage customer reviews:
- Add testimonials
- Edit reviews
- Set ratings
- Control visibility

**Fields:**
- Name (required)
- Position/Company
- Testimonial content (required)
- Image URL
- Rating (1-5)
- Active status

### FAQs Management
**Location:** `/admin/faqs`

Manage frequently asked questions:
- Add FAQs
- Edit Q&A pairs
- Organize by categories
- Control visibility

**Fields:**
- Question (required)
- Answer (required)
- Category
- Active status

### Media Library
**Location:** `/admin/media`

For now, use direct file paths from your `public/assets` folder.

Example paths:
- `/assets/services/service-name.jpg`
- `/assets/blog/blog-image.jpg`
- `/assets/team/member-photo.jpg`

## Tips

1. **Images:** Store all images in the `public/assets` folder and reference them using paths like `/assets/folder/image.jpg`

2. **Order Position:** Use numbers (0, 1, 2, etc.) to control the display order of items

3. **Active Status:** Uncheck "Active" to hide content without deleting it

4. **Publish Status (Blog):** Only published blog posts are visible on the frontend

5. **Auto-save:** Always click Save/Create button to persist changes

## Database

All content is stored in your Supabase database with the following tables:
- `services`
- `blog_posts`
- `portfolio_items`
- `team_members`
- `testimonials`
- `faqs`
- `media_files`
- `site_settings`

## Security

- Only authenticated users can access the admin panel
- All database tables have Row Level Security (RLS) enabled
- Public users can only view published/active content
- Admin users have full CRUD access

## Logout

Click the "Sign Out" button in the sidebar to logout safely.

## Support

If you encounter any issues, check:
1. Your Supabase connection is active
2. Your user has proper authentication
3. Database tables are properly configured
4. Environment variables are set correctly

---

Built with Next.js, Supabase, and React
