// frontend/src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import AddButton from '../components/AddButton';
import { useNavigate } from 'react-router-dom';

interface ApiHotel {
  name: string;
  category: string;
  destination: string;
  minRate?: number;
}

interface Hotel {
  name: string;
  category: string;
  destination: string;
  minRate: number;
}

const Dashboard: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/hotels/hotelbeds?city=PAR')
      .then((res) => {
        const apiHotels: ApiHotel[] = Object.values(res.data.hotels ?? {});
        const mapped: Hotel[] = apiHotels.map((h) => ({
          name: h.name,
          category: h.category,
          destination: h.destination,
          minRate: h.minRate ?? Math.floor(Math.random() * 100) + 80,
        }));
        setHotels(mapped);
      })
      .catch((err) => console.error('錯誤：無法取得飯店資料', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>載入中…</p>;

  return (
    <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      {/*  上方兩個按鈕 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={() => navigate('/hotels/list')}
          style={{
            backgroundColor: '#888',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
           酒店清單
        </button>

        <button
          onClick={() => navigate('/hotels/new')}
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
          ➕ 新增飯店
        </button>
      </div>

      <p>以下為推薦飯店清單：</p>

      <div className="hotel-container">
        {hotels.map((hotel, idx) => (
          <div className="hotel-card" key={idx}>
            <strong>{hotel.name}</strong>
            <p>類型：{hotel.category}</p>
            <p>城市代碼：{hotel.destination}</p>
            <p>價格：${hotel.minRate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
