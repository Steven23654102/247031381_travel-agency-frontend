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
  const token = localStorage.getItem('token');

  //  如果沒登入，跳轉回 login 頁面
  if (!token) {
    navigate('/login');
    return;
  }

  //  如果有 token 才嘗試抓資料
  const fetchHotels = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/api/hotels/hotelbeds?city=PAR',
        {
          headers: {
            Authorization: `Bearer ${token}` // 帶上登入憑證
          }
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
}, [navigate]);


  if (loading) return <p style={{ textAlign: 'center', color: '#fff' }}>載入中…</p>;

  return (
    <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button
  onClick={() => navigate('/flights')}
  style={{
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }}
>
   航班查詢
</button>

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

        {/* <button
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
           新增飯店
        </button> */}

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
           帳號設定
        </button>
      </div>
<div style={{ marginBottom: '1.5rem' }}>
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    }}
  >
    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      style={{
        padding: '0.5rem',
        borderRadius: '6px',
        backgroundColor: '#2c2c2c',
        color: 'white',
        border: '1px solid #666',
      }}
    >
      <option value="">所有類型</option>
      <option value="3EST">3EST</option>
      <option value="4EST">4EST</option>
      <option value="SUP">SUP</option>
    </select>

    <select
      value={destinationFilter}
      onChange={(e) => setDestinationFilter(e.target.value)}
      style={{
        padding: '0.5rem',
        borderRadius: '6px',
        backgroundColor: '#2c2c2c',
        color: 'white',
        border: '1px solid #666',
      }}
    >
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
      style={{
        padding: '0.5rem',
        borderRadius: '6px',
        width: '140px',
        backgroundColor: '#2c2c2c',
        color: 'white',
        border: '1px solid #666',
      }}
    />
  </div>

  <input
    type="text"
    placeholder="搜尋名稱、類型、城市代碼"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '1px solid #666',
      width: '320px',
      backgroundColor: '#2c2c2c',
      color: 'white',
    }}
  />
</div>


      <p>以下為推薦酒店清單：</p>

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
            <p>城市：{hotel.destination}</p>
            <p>價格：${hotel.minRate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
