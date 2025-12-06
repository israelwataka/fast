import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiBriefcase, FiFileText, FiImage, FiUsers, FiStar, FiHelpCircle, FiSettings, FiLogOut } from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
    { name: 'Services', path: '/admin/services', icon: FiBriefcase },
    { name: 'Blog', path: '/admin/blog', icon: FiFileText },
    { name: 'Portfolio', path: '/admin/portfolio', icon: FiImage },
    { name: 'Team', path: '/admin/team', icon: FiUsers },
    { name: 'Testimonials', path: '/admin/testimonials', icon: FiStar },
    { name: 'FAQs', path: '/admin/faqs', icon: FiHelpCircle },
    { name: 'Settings', path: '/admin/settings', icon: FiSettings }
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>{user?.email}</p>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
                <Icon /> {item.name}
              </Link>
            );
          })}
        </nav>
        <button onClick={signOut} className="logout-btn">
          <FiLogOut /> Logout
        </button>
      </aside>

      <main className="admin-main">
        {children}
      </main>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f5f5f5;
        }

        .admin-sidebar {
          width: 260px;
          background: #1a1a1a;
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid #333;
        }

        .sidebar-header h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
        }

        .sidebar-header p {
          margin: 0;
          font-size: 0.875rem;
          color: #999;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          color: #ccc;
          text-decoration: none;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background: #2a2a2a;
          color: white;
        }

        .nav-item.active {
          background: #0066cc;
          color: white;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: transparent;
          border: none;
          border-top: 1px solid #333;
          color: #ccc;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background: #2a2a2a;
          color: white;
        }

        .admin-main {
          flex: 1;
          margin-left: 260px;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            width: 60px;
          }

          .sidebar-header h2,
          .sidebar-header p,
          .nav-item span {
            display: none;
          }

          .admin-main {
            margin-left: 60px;
          }
        }
      `}</style>
    </div>
  );
}
