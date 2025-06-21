// src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupCode, setSignupCode] = useState(''); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
        signupCode,
      });
      setMessage('註冊成功，請登入');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err: any) {
      if (err.response?.data?.error) {
        setMessage(`${err.response.data.error}`);
      } else {
        setMessage('註冊失敗');
      }
    }
  };

return (
  <div className="auth-wrapper">
    <div className="auth-box">
      <h2>註冊</h2>
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
        <input
          type="text"
          placeholder="邀請碼（Signup Code）"
          value={signupCode}
          onChange={(e) => setSignupCode(e.target.value)}
        />
        <button type="submit">註冊</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  </div>
);

};

export default Register;
