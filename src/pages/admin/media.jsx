import Head from 'next/head';
import ProtectedRoute from '../../components/Admin/ProtectedRoute';
import AdminLayout from '../../components/Admin/AdminLayout';

export default function MediaManagement() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Head>
          <title>Media Library - Admin Panel</title>
        </Head>

        <div>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
              Media Library
            </h1>
            <p style={{ color: '#718096' }}>Upload and manage media files</p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '60px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <p style={{ color: '#718096', marginBottom: '16px' }}>
              For now, please use direct file paths from your public/assets folder.
            </p>
            <p style={{ color: '#718096', fontSize: '14px' }}>
              Example: /assets/services/service.jpg
            </p>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
