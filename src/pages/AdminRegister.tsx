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
    <div>
      <h2>Admin 註冊</h2>
      <form onSubmit={handleRegister}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密碼" />
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="註冊碼" />
        <button type="submit">註冊</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AdminRegister;
