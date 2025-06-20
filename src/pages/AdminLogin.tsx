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
    <div>
      <h2>Admin 登入</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密碼" />
        <button type="submit">登入</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AdminLogin;
