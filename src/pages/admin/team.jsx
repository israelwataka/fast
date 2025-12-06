import { useEffect, useState } from 'react';
import Head from 'next/head';
import ProtectedRoute from '../../components/Admin/ProtectedRoute';
import AdminLayout from '../../components/Admin/AdminLayout';
import { apiClient } from '../../lib/api';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiSave } from 'react-icons/fi';

export default function TeamManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    image: '',
    order_position: 0,
    is_active: true
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_position', { ascending: true });

    if (error) {
      console.error('Error:', error);
    } else {
      setMembers(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingMember) {
      const { error } = await supabase
        .from('team_members')
        .update(formData)
        .eq('id', editingMember.id);

      if (error) {
        alert('Error updating: ' + error.message);
      } else {
        alert('Updated successfully!');
        resetForm();
        fetchMembers();
      }
    } else {
      const { error } = await supabase
        .from('team_members')
        .insert([formData]);

      if (error) {
        alert('Error creating: ' + error.message);
      } else {
        alert('Created successfully!');
        resetForm();
        fetchMembers();
      }
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      image: member.image || '',
      order_position: member.order_position,
      is_active: member.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting: ' + error.message);
    } else {
      alert('Deleted successfully!');
      fetchMembers();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      bio: '',
      image: '',
      order_position: 0,
      is_active: true
    });
    setEditingMember(null);
    setShowModal(false);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <Head>
          <title>Team Management - Admin Panel</title>
        </Head>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                Team Management
              </h1>
              <p style={{ color: '#718096' }}>Manage your team members</p>
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
                fontSize: '14px'
              }}
            >
              <FiPlus size={18} style={{ marginRight: '8px' }} />
              Add Team Member
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
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Name</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Position</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Status</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
                        No team members found
                      </td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr key={member.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: '#2d3748' }}>{member.name}</td>
                        <td style={{ padding: '16px', color: '#718096' }}>{member.position}</td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: member.is_active ? '#c6f6d5' : '#fed7d7',
                            color: member.is_active ? '#22543d' : '#742a2a'
                          }}>
                            {member.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleEdit(member)}
                            style={{
                              padding: '8px',
                              background: '#edf2f7',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              marginRight: '8px'
                            }}
                          >
                            <FiEdit2 size={16} color="#667eea" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            style={{
                              padding: '8px',
                              background: '#fed7d7',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
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
                  {editingMember ? 'Edit Member' : 'Add Team Member'}
                </h2>
                <button onClick={resetForm} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}>
                  <FiX size={24} color="#718096" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/assets/team/member.jpg"
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
                    {editingMember ? 'Update' : 'Create'}
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
