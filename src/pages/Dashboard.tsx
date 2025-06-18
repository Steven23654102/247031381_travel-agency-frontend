// src/pages/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div style={{
      padding: '2rem',
      color: 'black',
      textAlign: 'center',
    }}>
      <h1>歡迎來到管理頁</h1>
      <p>這裡是登入後才能進來的區域</p>
    </div>
  );
};

export default Dashboard;
