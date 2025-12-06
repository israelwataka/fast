-- Highway Auto Solutions Database Schema
-- MySQL Database Setup
--
-- INSTRUCTIONS:
-- 1. Create a MySQL database: CREATE DATABASE highway_auto_solutions;
-- 2. Import this file: mysql -u username -p highway_auto_solutions < database.sql
-- 3. Update your .env file with database credentials

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS highway_auto_solutions;
USE highway_auto_solutions;

-- ============================================
-- ADMIN USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) DEFAULT 'Admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(500) DEFAULT '',
    image VARCHAR(500) DEFAULT '',
    features JSON DEFAULT NULL,
    order_position INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_order (order_position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT DEFAULT '',
    featured_image VARCHAR(500) DEFAULT '',
    author VARCHAR(255) DEFAULT 'Admin',
    category VARCHAR(100) DEFAULT 'General',
    tags JSON DEFAULT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_published (is_published),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PORTFOLIO ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS portfolio_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) DEFAULT '',
    images JSON DEFAULT NULL,
    client VARCHAR(255) DEFAULT '',
    date VARCHAR(100) DEFAULT '',
    url VARCHAR(500) DEFAULT '',
    order_position INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    bio TEXT DEFAULT '',
    image VARCHAR(500) DEFAULT '',
    social_links JSON DEFAULT NULL,
    order_position INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) DEFAULT '',
    content TEXT NOT NULL,
    image VARCHAR(500) DEFAULT '',
    rating INT DEFAULT 5,
    order_position INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    CHECK (rating >= 1 AND rating <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- FAQS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    order_position INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- MEDIA FILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS media_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100) DEFAULT '',
    size INT DEFAULT 0,
    alt_text VARCHAR(255) DEFAULT '',
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value JSON DEFAULT NULL,
    description TEXT DEFAULT '',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERT DEFAULT ADMIN USER
-- ============================================
-- Password: Vision@2030 (hashed with bcrypt)
INSERT INTO admin_users (email, password, name) VALUES
('admin@highwayautosolutions.com', '$2a$10$YourHashedPasswordHere', 'Admin')
ON DUPLICATE KEY UPDATE email=email;

-- Note: The actual password hash will be generated by the application on first run
-- The migration script will handle creating the admin user with proper bcrypt hash

-- ============================================
-- SAMPLE DATA (OPTIONAL)
-- ============================================

-- Sample Services
INSERT INTO services (title, description, icon, image, order_position, is_active) VALUES
('Auto Repair', 'Professional auto repair services for all vehicle types', '/assets/icons/serv_icons/1.png', '/assets/services/ac.jpg', 1, TRUE),
('Brake Service', 'Complete brake inspection and repair services', '/assets/icons/serv_icons/2.png', '/assets/services/BrakeRepair.jpg', 2, TRUE),
('Oil Change', 'Quick and efficient oil change services', '/assets/icons/serv_icons/3.png', '/assets/services/ac.jpg', 3, TRUE)
ON DUPLICATE KEY UPDATE title=title;

-- Sample Blog Posts
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author, category, is_published, published_at) VALUES
('Essential Car Maintenance Tips', 'essential-car-maintenance-tips', 'Regular maintenance is crucial for your vehicle...', 'Learn the essential maintenance tips every car owner should know', '/assets/blog/Maintenance.jpg', 'Admin', 'Maintenance', TRUE, NOW()),
('Winter Driving Safety', 'winter-driving-safety', 'Prepare your vehicle for winter conditions...', 'Stay safe on the road during winter months', '/assets/blog/winter.jpg', 'Admin', 'Safety', TRUE, NOW())
ON DUPLICATE KEY UPDATE title=title;

-- Sample FAQs
INSERT INTO faqs (question, answer, category, order_position, is_active) VALUES
('What are your business hours?', 'We are open Monday to Friday, 8:00 AM to 6:00 PM, and Saturday 9:00 AM to 4:00 PM.', 'General', 1, TRUE),
('Do you offer mobile services?', 'Yes, we offer mobile repair services for certain types of repairs. Please contact us for details.', 'Services', 2, TRUE),
('What payment methods do you accept?', 'We accept cash, credit cards, debit cards, and digital payments.', 'Payment', 3, TRUE)
ON DUPLICATE KEY UPDATE question=question;

-- ============================================
-- DATABASE SCHEMA COMPLETE
-- ============================================