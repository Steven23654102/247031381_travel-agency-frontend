import React from 'react';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', position: 'relative', color: 'white' }}>
      {/* 右上角顯示帳號與登出 */}
      <div style={{ position: 'absolute', top: 10, right: 20, display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span><strong>登入帳號：</strong>{email}</span>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          登出
        </button>
      </div>

      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>帳號設定</h2>
      <p>這裡可以顯示帳號資訊、修改密碼等等。</p>
    </div>
  );
};

export default Account;
