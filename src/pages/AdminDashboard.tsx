// frontend/src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('http://localhost:3000/api/admin/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(res.data.admin);
      } catch (err) {
        console.error('驗證失敗', err);
      }
    };

    fetchProfile();
  }, []);

return (
  <div
    style={{
      backgroundColor: '#1e1e1e',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}
  >
    <div
      style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        textAlign: 'center'
      }}
    >
      <h2 style={{ marginBottom: '1rem', color: '#000' }}>Admin Dashboard</h2>

      {profile ? (
        <>
          <p style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: '#333' }}>
            歡迎你, {profile.email}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/hotels/new')}
              style={{
                backgroundColor: '#1890ff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              新增飯店
            </button>

            <button
              onClick={() => navigate('/hotels/list')}
              style={{
                backgroundColor: '#888',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              酒店清單
            </button>

            <button
              onClick={() => navigate('/flights')}
              style={{
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              航班查詢
            </button>

            <button
              onClick={() => navigate('/admin/bookings')}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              預約紀錄
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
              }}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              登出
            </button>
          </div>
        </>
      ) : (
        <p>載入中...</p>
      )}
    </div>
  </div>
);

};

export default AdminDashboard;
