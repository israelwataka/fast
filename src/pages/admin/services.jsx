import { useEffect, useState } from 'react';
import Head from 'next/head';
import ProtectedRoute from '../../components/Admin/ProtectedRoute';
import AdminLayout from '../../components/Admin/AdminLayout';
import { apiClient } from '../../lib/api';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiSave } from 'react-icons/fi';

export default function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    image: '',
    features: [],
    order_position: 0,
    is_active: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/api/services');
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingService) {
        await apiClient.put(`/api/services/${editingService.id}`, formData);
        alert('Service updated successfully!');
      } else {
        await apiClient.post('/api/services', formData);
        alert('Service created successfully!');
      }
      resetForm();
      fetchServices();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      image: service.image || '',
      features: service.features || [],
      order_position: service.order_position,
      is_active: service.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await apiClient.delete(`/api/services/${id}`);
      alert('Service deleted successfully!');
      fetchServices();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      image: '',
      features: [],
      order_position: 0,
      is_active: true
    });
    setEditingService(null);
    setShowModal(false);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <Head>
          <title>Services Management - Admin Panel</title>
        </Head>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                Services Management
              </h1>
              <p style={{ color: '#718096' }}>Manage your service offerings</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <FiPlus size={18} style={{ marginRight: '8px' }} />
              Add New Service
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #e2e8f0',
                borderTopColor: '#667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }}></div>
            </div>
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f7fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Title</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Description</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Status</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Order</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
                        No services found. Create your first service!
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: '#2d3748' }}>{service.title}</td>
                        <td style={{ padding: '16px', color: '#718096', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {service.description}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: service.is_active ? '#c6f6d5' : '#fed7d7',
                            color: service.is_active ? '#22543d' : '#742a2a'
                          }}>
                            {service.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center', color: '#718096' }}>{service.order_position}</td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleEdit(service)}
                            style={{
                              padding: '8px',
                              background: '#edf2f7',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              marginRight: '8px',
                              transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#edf2f7'}
                          >
                            <FiEdit2 size={16} color="#667eea" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            style={{
                              padding: '8px',
                              background: '#fed7d7',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#fc8181'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#fed7d7'}
                          >
                            <FiTrash2 size={16} color="#c53030" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }} onClick={(e) => e.target === e.currentTarget && resetForm()}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c' }}>
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  onClick={resetForm}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  <FiX size={24} color="#718096" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                    Icon URL
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="/assets/icons/icon.png"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/assets/services/service.jpg"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                    Order Position
                  </label>
                  <input
                    type="number"
                    value={formData.order_position}
                    onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      style={{ marginRight: '8px', width: '16px', height: '16px' }}
                    />
                    <span style={{ fontWeight: '600', color: '#2d3748' }}>Active</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FiSave size={18} style={{ marginRight: '8px' }} />
                    {editingService ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: '12px 24px',
                      background: '#edf2f7',
                      color: '#2d3748',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </AdminLayout>
    </ProtectedRoute>
  );
}
