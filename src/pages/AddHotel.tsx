// frontend/src/pages/AddHotel.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddHotel: React.FC = () => {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [minRate, setMinRate] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //  這行是用來檢查 token 是否真的存在
  console.log('🚀 token:', localStorage.getItem('token'));
    try {
      await axios.post(
        'http://localhost:3000/api/hotels',
        {
          name,
          destination,
          minRate: parseInt(minRate, 10),
          phone,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setMessage(' 新增成功！');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err: any) {
      setMessage(' 新增失敗：' + (err.response?.data?.error || '未知錯誤'));
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>新增飯店</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
        <input
          type="text"
          placeholder="酒店名稱"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        /><br /><br />

        <input
          type="text"
          placeholder="地址（城市代碼）"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        /><br /><br />

        <input
          type="number"
          placeholder="價格"
          value={minRate}
          onChange={(e) => setMinRate(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        /><br /><br />

        <input
          type="text"
          placeholder="聯絡電話"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        /><br /><br />

        <textarea
          placeholder="簡介"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        /><br /><br />

        <button
          type="submit"
          style={{
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
           新增酒店
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default AddHotel;
