//AdminRegister.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/admin/register', {
        email,
        password,
        code
      });
      setMessage(' 註冊成功，請登入');
      setTimeout(() => navigate('/admin/login'), 1000);
    } catch (err: any) {
      setMessage(' 註冊失敗：' + (err.response?.data?.message || '未知錯誤'));
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
      <h2 style={{ marginBottom: '1.5rem', color: '#000' }}>Admin 註冊</h2>

      <form onSubmit={handleRegister}>
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
            marginBottom: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        />
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="註冊碼"
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
          註冊
        </button>
      </form>

      {message && <p style={{ color: 'red', marginBottom: '1rem' }}>{message}</p>}

      <p style={{ fontSize: '0.9rem', color: '#333' }}>
        已經有帳號？{' '}
        <a href="/admin/login" style={{ color: '#007bff', textDecoration: 'none' }}>
          返回登入
        </a>
      </p>
    </div>
  </div>
);

};

export default AdminRegister;
