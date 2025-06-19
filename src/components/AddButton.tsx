// frontend/src/components/AddButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/hotels/new'); // 或你設計的新增頁面路由
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        ➕ 新增飯店
      </button>
    </div>
  );
};

export default AddButton;
