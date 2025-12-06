import Head from 'next/head';
import ProtectedRoute from '../../components/Admin/ProtectedRoute';
import AdminLayout from '../../components/Admin/AdminLayout';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Head>
          <title>Settings - Admin Panel</title>
        </Head>

        <div>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
              Settings
            </h1>
            <p style={{ color: '#718096' }}>Configure your website settings</p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ color: '#718096' }}>
              Settings management coming soon. You can configure site-wide settings here.
            </p>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
