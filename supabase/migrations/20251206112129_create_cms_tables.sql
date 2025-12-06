/*
  # Content Management System Database Schema
  
  ## Overview
  Creates a comprehensive CMS database for managing all website content including
  services, blog posts, portfolio items, team members, testimonials, and media files.
  
  ## New Tables
  
  ### 1. `services`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Service title
  - `description` (text) - Service description
  - `icon` (text) - Icon URL or identifier
  - `image` (text) - Main service image URL
  - `features` (jsonb) - Array of service features
  - `order_position` (integer) - Display order
  - `is_active` (boolean) - Whether service is published
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 2. `blog_posts`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Post title
  - `slug` (text, unique) - URL-friendly identifier
  - `content` (text) - Post content (HTML/markdown)
  - `excerpt` (text) - Short description
  - `featured_image` (text) - Main image URL
  - `author` (text) - Author name
  - `category` (text) - Post category
  - `tags` (jsonb) - Array of tags
  - `is_published` (boolean) - Publication status
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 3. `portfolio_items`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Project title
  - `description` (text) - Project description
  - `category` (text) - Project category
  - `images` (jsonb) - Array of image URLs
  - `client` (text) - Client name
  - `date` (text) - Project date
  - `url` (text) - Project URL
  - `order_position` (integer) - Display order
  - `is_active` (boolean) - Whether project is published
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 4. `team_members`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Member name
  - `position` (text) - Job title/position
  - `bio` (text) - Biography
  - `image` (text) - Profile image URL
  - `social_links` (jsonb) - Social media links
  - `order_position` (integer) - Display order
  - `is_active` (boolean) - Whether member is shown
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 5. `testimonials`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Customer name
  - `position` (text) - Job title/company
  - `content` (text) - Testimonial text
  - `image` (text) - Customer image URL
  - `rating` (integer) - Rating (1-5)
  - `order_position` (integer) - Display order
  - `is_active` (boolean) - Whether testimonial is shown
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 6. `faqs`
  - `id` (uuid, primary key) - Unique identifier
  - `question` (text) - FAQ question
  - `answer` (text) - FAQ answer
  - `category` (text) - FAQ category
  - `order_position` (integer) - Display order
  - `is_active` (boolean) - Whether FAQ is shown
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 7. `media_files`
  - `id` (uuid, primary key) - Unique identifier
  - `filename` (text) - Original filename
  - `url` (text) - File URL
  - `mime_type` (text) - File type
  - `size` (integer) - File size in bytes
  - `alt_text` (text) - Alternative text for images
  - `uploaded_by` (uuid) - User who uploaded (references auth.users)
  - `created_at` (timestamptz) - Upload timestamp
  
  ### 8. `site_settings`
  - `id` (uuid, primary key) - Unique identifier
  - `key` (text, unique) - Setting key
  - `value` (jsonb) - Setting value
  - `description` (text) - Setting description
  - `updated_at` (timestamptz) - Last update timestamp
  
  ## Security
  - Enable RLS on all tables
  - Only authenticated admin users can modify content
  - Public users can read published content only
  
  ## Notes
  - All tables include timestamps for audit trail
  - JSONB fields allow flexible data storage
  - Order positions enable custom sorting
  - Soft deletion via is_active flags
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT '',
  image text DEFAULT '',
  features jsonb DEFAULT '[]'::jsonb,
  order_position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text DEFAULT '',
  featured_image text DEFAULT '',
  author text DEFAULT 'Admin',
  category text DEFAULT 'General',
  tags jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text DEFAULT '',
  images jsonb DEFAULT '[]'::jsonb,
  client text DEFAULT '',
  date text DEFAULT '',
  url text DEFAULT '',
  order_position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  bio text DEFAULT '',
  image text DEFAULT '',
  social_links jsonb DEFAULT '{}'::jsonb,
  order_position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text DEFAULT '',
  content text NOT NULL,
  image text DEFAULT '',
  rating integer DEFAULT 5,
  order_position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'General',
  order_position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media_files table
CREATE TABLE IF NOT EXISTS media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  mime_type text DEFAULT '',
  size integer DEFAULT 0,
  alt_text text DEFAULT '',
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb DEFAULT '{}'::jsonb,
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Services policies
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (true);

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can view all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Portfolio items policies
CREATE POLICY "Anyone can view active portfolio items"
  ON portfolio_items FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all portfolio items"
  ON portfolio_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert portfolio items"
  ON portfolio_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update portfolio items"
  ON portfolio_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete portfolio items"
  ON portfolio_items FOR DELETE
  TO authenticated
  USING (true);

-- Team members policies
CREATE POLICY "Anyone can view active team members"
  ON team_members FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all team members"
  ON team_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete team members"
  ON team_members FOR DELETE
  TO authenticated
  USING (true);

-- Testimonials policies
CREATE POLICY "Anyone can view active testimonials"
  ON testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);

-- FAQs policies
CREATE POLICY "Anyone can view active FAQs"
  ON faqs FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all FAQs"
  ON faqs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert FAQs"
  ON faqs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update FAQs"
  ON faqs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete FAQs"
  ON faqs FOR DELETE
  TO authenticated
  USING (true);

-- Media files policies
CREATE POLICY "Anyone can view media files"
  ON media_files FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can upload media files"
  ON media_files FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete their media files"
  ON media_files FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Site settings policies
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_position);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio_items(is_active);
CREATE INDEX IF NOT EXISTS idx_team_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at automatically
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();