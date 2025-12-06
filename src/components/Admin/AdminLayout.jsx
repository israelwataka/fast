import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import {
  FiHome, FiFileText, FiImage, FiUsers, FiMessageSquare,
  FiHelpCircle, FiSettings, FiLogOut, FiMenu, FiX,
  FiBriefcase, FiStar
} from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut, user } = useAuth();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/admin/dashboard' },
    { name: 'Services', icon: FiBriefcase, path: '/admin/services' },
    { name: 'Blog Posts', icon: FiFileText, path: '/admin/blog' },
    { name: 'Portfolio', icon: FiImage, path: '/admin/portfolio' },
    { name: 'Team Members', icon: FiUsers, path: '/admin/team' },
    { name: 'Testimonials', icon: FiStar, path: '/admin/testimonials' },
    { name: 'FAQs', icon: FiHelpCircle, path: '/admin/faqs' },
    { name: 'Media Library', icon: FiImage, path: '/admin/media' },
    { name: 'Settings', icon: FiSettings, path: '/admin/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7fafc' }}>
      <aside style={{
        width: sidebarOpen ? '260px' : '0',
        background: 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        transition: 'width 0.3s',
        zIndex: 1000,
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
      }} className="sidebar-responsive">
        <div style={{ padding: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
              Admin Panel
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              <FiX size={24} />
            </button>
          </div>

          <nav>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <a style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 16px',
                    color: isActive ? 'white' : '#a0aec0',
                    background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    fontWeight: isActive ? '600' : 'normal'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#a0aec0';
                    }
                  }}>
                    <Icon size={20} style={{ marginRight: '12px' }} />
                    {item.name}
                  </a>
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #4a5568' }}>
            <button
              onClick={signOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '12px 16px',
                color: '#fc8181',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(252, 129, 129, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <FiLogOut size={20} style={{ marginRight: '12px' }} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '260px' : '0',
        transition: 'margin-left 0.3s'
      }}>
        <header style={{
          background: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f7fafc'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <FiMenu size={24} color="#2d3748" />
          </button>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <span style={{
              marginLeft: '12px',
              fontSize: '14px',
              color: '#2d3748',
              fontWeight: '500'
            }}>
              {user?.email}
            </span>
          </div>
        </header>

        <main style={{ padding: '24px' }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .sidebar-responsive {
            width: 260px !important;
          }
        }
      `}</style>
    </div>
  );
}
