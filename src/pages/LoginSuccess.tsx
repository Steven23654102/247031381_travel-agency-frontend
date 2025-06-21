// pages/LoginSuccess.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token); // 存 token
      navigate('/dashboard'); // 導去主頁
    } else {
      navigate('/login');
    }
  }, []);

  return <p>登入成功，正在導向...</p>;
};

export default LoginSuccess;
