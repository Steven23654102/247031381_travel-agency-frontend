// frontend/src/pages/HotelsList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Hotel {
  _id: string; // ✅ 加這行
  name: string;
  destination: string;
  minRate: number;
  phone?: string;
  description?: string;
}

const HotelsList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const navigate = useNavigate();
  const handleClick = (id: string) => {
  navigate(`/hotels/${id}/booking`);
};

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/hotels') //  使用從 MongoDB 撈資料的 API
      .then((res) => setHotels(res.data))
      .catch((err) => console.error('獲取飯店資料失敗:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      <h2> 酒店清單（來自 MongoDB）</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
        {hotels.map((hotel, idx) => (
          <div
            key={hotel._id}
  onClick={() => handleClick(hotel._id)} // ✅ 點擊後跳轉
  style={{  
              background: '#fff',
              color: '#000',
              borderRadius: '12px',
              padding: '1.5rem',
              minWidth: '220px',
              maxWidth: '300px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer' // ✅ 加上滑鼠變化提示

            }}
          >
            <strong style={{ color: '#007bff' }}>{hotel.name}</strong>
            <p>地址：{hotel.destination || 'N/A'}</p>
            <p>價格：${hotel.minRate ?? 'N/A'}</p>
            {hotel.phone && <p>電話：{hotel.phone}</p>}
            {hotel.description && <p>簡介：{hotel.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsList;
