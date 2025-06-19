// frontend/src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

interface Hotel {
  name: string;
  category: string;
  destination: string;
  minRate: number;
}

const Dashboard: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [categoryFilter, setCategoryFilter] = useState('');
const [destinationFilter, setDestinationFilter] = useState('');
const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          'http://localhost:3000/api/hotels/hotelbeds?city=PAR',
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined
          }
        );

        const raw: any[] = Array.isArray(data.hotels)
          ? data.hotels
          : Object.values(data.hotels ?? {});

        const mapped: Hotel[] = raw.slice(0, 20).map((h) => ({
          name: h.name ?? h.name?.content ?? '無名稱',
          category: h.category ?? h.categoryCode ?? '無分類',
          destination: h.destination ?? h.city ?? h.city?.content ?? '未知',
          minRate: h.minRate ?? 1000
        }));

        setHotels(mapped);
      } catch (err) {
        console.error('取得 hotelbeds 資料失敗：', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', color: '#fff' }}>載入中…</p>;

  return (
    <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
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

        <button
          onClick={() => navigate('/bookings')}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          查看預約記錄
        </button>

        <button
          onClick={() => navigate('/account')}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          👤 帳號設定
        </button>
      </div>
<div style={{ marginBottom: '1rem' }}>
  <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
    <option value="">所有類型</option>
    <option value="3EST">3EST</option>
    <option value="4EST">4EST</option>
    <option value="SUP">SUP</option>
    {/* 你可根據實際資料補上其他類型 */}
  </select>

  <select value={destinationFilter} onChange={(e) => setDestinationFilter(e.target.value)}>
    <option value="">所有城市</option>
    <option value="LPA">LPA</option>
    <option value="SAL">SAL</option>
    <option value="LLM">LLM</option>
  </select>

  <input
    type="number"
    placeholder="最高價格"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
    style={{ width: '120px' }}
  />
</div>

  <input
    type="text"
    placeholder="搜尋名稱、類型、城市代碼"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      width: '300px'
    }}
  />
</div>

      <p>以下為推薦飯店清單：</p>

      <div className="hotel-container">
        {hotels
  .filter(hotel =>
    (hotel.name.toLowerCase().includes(search.toLowerCase()) ||
     hotel.category.toLowerCase().includes(search.toLowerCase()) ||
     hotel.destination.toLowerCase().includes(search.toLowerCase()))
    &&
    (!categoryFilter || hotel.category === categoryFilter)
    &&
    (!destinationFilter || hotel.destination === destinationFilter)
    &&
    (maxPrice === '' || hotel.minRate <= maxPrice)
  )

  .map((hotel, idx) => (

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
