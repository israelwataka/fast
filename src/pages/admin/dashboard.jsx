import { useEffect, useState } from 'react';
import Head from 'next/head';
import ProtectedRoute from '../../components/Admin/ProtectedRoute';
import AdminLayout from '../../components/Admin/AdminLayout';
import { apiClient } from '../../lib/api';
import { FiBriefcase, FiFileText, FiImage, FiUsers, FiStar, FiHelpCircle } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    blogPosts: 0,
    portfolio: 0,
    team: 0,
    testimonials: 0,
    faqs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [services, blogPosts, portfolio, team, testimonials, faqs] = await Promise.all([
        apiClient.get('/api/services'),
        apiClient.get('/api/blog'),
        apiClient.get('/api/portfolio'),
        apiClient.get('/api/team'),
        apiClient.get('/api/testimonials'),
        apiClient.get('/api/faqs')
      ]);

      setStats({
        services: services.length || 0,
        blogPosts: blogPosts.length || 0,
        portfolio: portfolio.length || 0,
        team: team.length || 0,
        testimonials: testimonials.length || 0,
        faqs: faqs.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { name: 'Services', value: stats.services, icon: FiBriefcase, color: '#667eea', link: '/admin/services' },
    { name: 'Blog Posts', value: stats.blogPosts, icon: FiFileText, color: '#f093fb', link: '/admin/blog' },
    { name: 'Portfolio', value: stats.portfolio, icon: FiImage, color: '#4facfe', link: '/admin/portfolio' },
    { name: 'Team Members', value: stats.team, icon: FiUsers, color: '#43e97b', link: '/admin/team' },
    { name: 'Testimonials', value: stats.testimonials, icon: FiStar, color: '#fa709a', link: '/admin/testimonials' },
    { name: 'FAQs', value: stats.faqs, icon: FiHelpCircle, color: '#feca57', link: '/admin/faqs' }
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <Head>
          <title>Dashboard - Admin Panel</title>
        </Head>

        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '8px'
          }}>
            Dashboard
          </h1>
          <p style={{ color: '#718096', marginBottom: '32px' }}>
            Welcome to your content management system
          </p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #e2e8f0',
                borderTopColor: '#667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px'
              }}></div>
              <p style={{ color: '#718096' }}>Loading statistics...</p>
              <style jsx>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.name}
                    href={card.link}
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      border: '1px solid #e2e8f0',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{
                          color: '#718096',
                          fontSize: '14px',
                          marginBottom: '8px',
                          fontWeight: '500'
                        }}>
                          {card.name}
                        </p>
                        <p style={{
                          fontSize: '32px',
                          fontWeight: 'bold',
                          color: '#1a202c'
                        }}>
                          {card.value}
                        </p>
                      </div>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={24} color="white" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            marginTop: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: '16px'
            }}>
              Quick Actions
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <a href="/admin/services" style={{
                padding: '16px',
                background: '#f7fafc',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#2d3748',
                fontWeight: '500',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#edf2f7'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f7fafc'}>
                Add New Service
              </a>
              <a href="/admin/blog" style={{
                padding: '16px',
                background: '#f7fafc',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#2d3748',
                fontWeight: '500',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#edf2f7'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f7fafc'}>
                Create Blog Post
              </a>
              <a href="/admin/portfolio" style={{
                padding: '16px',
                background: '#f7fafc',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#2d3748',
                fontWeight: '500',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#edf2f7'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f7fafc'}>
                Add Portfolio Item
              </a>
              <a href="/admin/media" style={{
                padding: '16px',
                background: '#f7fafc',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#2d3748',
                fontWeight: '500',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#edf2f7'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f7fafc'}>
                Upload Media
              </a>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
