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
    <div>
      <h2>Admin Dashboard</h2>
      {profile ? (
        <>
          <p>歡迎你, {profile.email}</p>
<button
  onClick={() => navigate('/hotels/new')}
  style={{
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }}
>
  ➕ 新增飯店
</button>


        <button
          onClick={() => navigate('/hotels/list')}
          style={{
            backgroundColor: '#888',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
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
    cursor: 'pointer',
    fontWeight: 'bold'
  }}
>
  ✈️ 航班查詢
</button>

<button
  onClick={() => navigate('/admin/bookings')}
  style={{
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 12px',
    marginTop: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  查看所有預約
</button>


          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/admin/login');
            }}
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '8px 12px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            登出
          </button>
        </>
      ) : (
        <p>載入中...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
