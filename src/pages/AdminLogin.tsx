//AdminLogin.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/admin/login', {
        email,
        password
      });
      localStorage.setItem('adminToken', res.data.token);
      setMessage('登入成功');
      setTimeout(() => navigate('/admin/dashboard'), 1000);
    } catch (err: any) {
      setMessage('登入失敗');
    }
  };

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
          maxWidth: '400px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          textAlign: 'center'
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#000', fontWeight: 'bold' }}>Admin 登入</h2>

        <form onSubmit={handleLogin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="電子郵件"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密碼"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '1.5rem',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            登入
          </button>
        </form>

        {message && <p style={{ color: 'red', marginBottom: '1rem' }}>{message}</p>}

        <p style={{ fontSize: '0.9rem', color: '#333' }}>
          還沒有帳號？{' '}
          <a href="/admin/register" style={{ color: '#007bff', textDecoration: 'none' }}>
            點我註冊
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
