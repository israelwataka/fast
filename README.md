# Highway Auto Solutions - CMS Web Application

A complete content management system for Highway Auto Solutions built with Next.js and MySQL.

## Features

- **Full CMS Admin Panel** - Manage all website content
- **MySQL Database** - Reliable and scalable data storage
- **Authentication** - Secure admin access with JWT
- **Responsive Design** - Works on all devices
- **Content Management** for:
  - Services
  - Blog Posts
  - Portfolio Items
  - Team Members
  - Testimonials
  - FAQs

## Prerequisites

- Node.js 14+ installed
- MySQL 5.7+ or 8.0+ installed and running
- npm or yarn package manager

## Installation

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up MySQL Database

#### Create the database and import the schema:

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE highway_auto_solutions;

# Exit MySQL
exit

# Import the database schema
mysql -u root -p highway_auto_solutions < database.sql
```

### 3. Configure Environment Variables

Update the `.env` file with your MySQL credentials:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=highway_auto_solutions

# JWT Secret for Authentication
JWT_SECRET=highway_auto_solutions_secret_key_2030_vision
```

### 4. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Admin Panel

### Access

Navigate to: `http://localhost:3000/admin/login`

### Default Admin Credentials

**Email:** admin@highwayautosolutions.com
**Password:** Vision@2030

### Admin Features

- **Dashboard** (`/admin/dashboard`) - Overview and statistics
- **Services** (`/admin/services`) - Manage automotive services
- **Blog** (`/admin/blog`) - Create and publish blog posts
- **Portfolio** (`/admin/portfolio`) - Showcase completed projects
- **Team** (`/admin/team`) - Manage team member profiles
- **Testimonials** (`/admin/testimonials`) - Customer reviews and ratings
- **FAQs** (`/admin/faqs`) - Frequently asked questions
- **Media** (`/admin/media`) - Image management
- **Settings** (`/admin/settings`) - Site configuration

## Database Schema

The `database.sql` file contains the complete database schema with:

- `admin_users` - Admin authentication
- `services` - Service offerings
- `blog_posts` - Blog content
- `portfolio_items` - Portfolio projects
- `team_members` - Team profiles
- `testimonials` - Customer testimonials
- `faqs` - FAQ entries
- `media_files` - Uploaded files
- `site_settings` - Site configuration

## API Routes

All admin operations use RESTful API routes:

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create service
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### Blog Posts
- `GET /api/blog` - List all posts
- `POST /api/blog` - Create post
- `PUT /api/blog/[id]` - Update post
- `DELETE /api/blog/[id]` - Delete post

*Similar patterns for portfolio, team, testimonials, and FAQs*

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── Admin/       # Admin panel components
│   │   └── ...
│   ├── contexts/        # React contexts (Auth)
│   ├── lib/             # Utilities
│   │   ├── db.js       # MySQL connection
│   │   ├── auth.js     # Authentication helpers
│   │   ├── api.js      # API client
│   │   └── middleware.js # Auth middleware
│   ├── pages/           # Next.js pages
│   │   ├── admin/      # Admin panel pages
│   │   ├── api/        # API routes
│   │   └── ...
│   └── styles/          # CSS styles
├── public/              # Static assets
│   └── assets/         # Images and media
├── database.sql         # MySQL database schema
├── .env                 # Environment variables
└── package.json         # Dependencies

```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for session management
- HTTP-only cookies for token storage
- Protected API routes with authentication middleware
- SQL injection protection with parameterized queries

## Troubleshooting

### Database Connection Issues

1. Verify MySQL is running: `sudo systemctl status mysql`
2. Check credentials in `.env` file
3. Ensure database exists: `SHOW DATABASES;`
4. Verify user permissions

### Admin Login Issues

1. Ensure database has been imported
2. Check if admin user exists: `SELECT * FROM admin_users;`
3. If not, the admin will be created automatically on first login attempt

### Build Errors

1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node.js version: `node --version` (should be 14+)

## Development

### Adding New Content Types

1. Add table to `database.sql`
2. Create API routes in `src/pages/api/`
3. Create admin page in `src/pages/admin/`
4. Add navigation link in `AdminLayout.jsx`

### Customization

- Modify styles in `src/styles/`
- Update components in `src/components/`
- Add new API routes in `src/pages/api/`

## Production Deployment

### Using PM2

```bash
npm run build
pm2 start npm --name "highway-auto" -- start
pm2 save
pm2 startup
```

### Using Docker

```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Support

For issues or questions, check:
1. MySQL connection and credentials
2. Database schema is properly imported
3. Environment variables are set correctly
4. Node.js and npm versions are compatible

## License

Proprietary - Highway Auto Solutions

---

Built with Next.js, MySQL, and React
