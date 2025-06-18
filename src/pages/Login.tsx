// src/pages/Login.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#1e1e1e'
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
