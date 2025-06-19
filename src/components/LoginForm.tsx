/**
 * src/components/LoginForm.tsx
 * ----------------------------
 * - 旅遊社職員登入表單
 * - 登入成功流程：
 *     1. 儲存 JWT 與 role ➜ localStorage
 *     2. 全域設定 axios Authorization Header
 *     3. 顯示成功訊息後導向 /dashboard
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  /* ---------- state ---------- */
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg]           = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  /* ---------- handler ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      const { token, role } = res.data;

      /*  儲存憑證到 localStorage */
      localStorage.setItem('token', token);
      localStorage.setItem('role',  role);

      /*  為 axios 設定預設的 Authorization header */
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      /*  提示並導頁 */
      setMsg(' 登入成功，前往控制台…');
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err: any) {
      const errMsg = err.response?.data?.error || '登入失敗';
      setMsg(` ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- jsx ---------- */
  return (
    <div className="form-container">
      <h2>登入</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="電子郵件"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? '登入中…' : '登入'}
        </button>
      </form>

      {msg && <p>{msg}</p>}

      {/* 前往註冊 */}
      <p style={{ marginTop: '1rem' }}>
        還沒有帳號？&nbsp;
        <button
          type="button"
          onClick={() => navigate('/register')}
          style={{
            background: 'none',
            color: '#007bff',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          點我註冊
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
