// frontend/src/pages/HotelsList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Hotel {
  _id: string;
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
      .get('http://localhost:3000/api/hotels')
      .then((res) => setHotels(res.data))
      .catch((err) => console.error('獲取飯店資料失敗:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      <h2>酒店清單</h2>
      
      <button
  onClick={() => navigate('/favorites')}
  style={{
    backgroundColor: '#00bcd4',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '1rem',
  }}
>
   我的收藏
</button>


      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            onClick={() => handleClick(hotel._id)}
            style={{
              background: '#fff',
              color: '#000',
              borderRadius: '12px',
              padding: '1.5rem',
              minWidth: '220px',
              maxWidth: '300px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <strong style={{ color: '#007bff' }}>{hotel.name}</strong>
            <p>地址：{hotel.destination || 'N/A'}</p>
            <p>價格：${hotel.minRate ?? 'N/A'}</p>
            {hotel.phone && <p>電話：{hotel.phone}</p>}
            {hotel.description && <p>簡介：{hotel.description}</p>}

            {/*  收藏按鈕 */}
            <button
  style={{
    marginTop: '1rem',
    padding: '8px 14px',
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    transition: 'background-color 0.2s ease',
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ffca2c')}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffc107')}

              onClick={async (e) => {
                e.stopPropagation(); // 防止點擊跳轉
                try {
                  const token = localStorage.getItem('token');
                  await axios.post(
                    'http://localhost:3000/api/hotels/favorites',
                    { hotelId: hotel._id },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  alert(' 已收藏！');
                } catch (err) {
                  alert(' 收藏失敗');
                  console.error(err);
                }
              }}
            >
              ⭐ 收藏
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsList;
