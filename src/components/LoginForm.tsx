// src/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // 匯入 CSS

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setMessage('登入成功');
      setTimeout(() => navigate('/dashboard'), 1000); // 登入成功後跳轉
    } catch (err) {
      setMessage('登入失敗');
    }
  };

  return (
    <div className="form-container">
      <h2>登入</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="電子郵件"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">登入</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
