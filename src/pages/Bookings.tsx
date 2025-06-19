// frontend/src/pages/Bookings.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
      _id: string; // 加在最上面
  hotelId: {
    name: string;
    destination: string;
    minRate: number;
  };
  guestEmail: string;
  checkInDate: string;
  stayDays: number;
  note?: string;
  rating?: number;
  sequence?: number;
}

const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const handleDelete = async (id: string) => {
  if (!window.confirm('確認刪除此預約？')) return;
  try {
    await axios.delete(`http://localhost:3000/api/hotels/bookings/${id}`);
    setBookings(prev => prev.filter(b => b._id !== id));
  } catch (err) {
    console.error(' 刪除失敗:', err);
  }
};

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/hotels/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(' Booking data:', res.data);
      setBookings(res.data);
    } catch (err) {
      console.error(' Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchBookings();
}, []);


  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2 style={{ marginBottom: '2rem' }}>預約記錄</h2>
      {loading ? (
        <p>載入中...</p>
      ) : bookings.length === 0 ? (
        <p>尚無預約記錄</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.map((b, i) => (
            <div
  key={i}
  style={{
    backgroundColor: '#fff',
    color: '#000',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
    width: '100%', // 寬度改成100%
    maxWidth: '900px', // 可根據你畫面最大寬限制
    margin: '0 auto'   // 置中顯示
  }}
>

              <p><strong> 預約者：</strong>{b.guestEmail}</p>
              <p><strong> 酒店：</strong>{b.hotelId?.name}</p>
              <p><strong> 地址：</strong>{b.hotelId?.destination}</p>
              <p><strong> 每晚價格：</strong>${b.hotelId?.minRate}</p>
              <p><strong> 入住日期：</strong>{b.checkInDate}</p>
              <p><strong> 入住天數：</strong>{b.stayDays} 天</p>
              <p><strong> 備註：</strong>{b.note || '（無）'}</p>
              <p><strong> 評分：</strong>{b.rating ?? '尚未評分'}</p>
              <button
  style={{
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    marginTop: '0.5rem',
    cursor: 'pointer'
  }}
  onClick={() => handleDelete(b._id)}
>
   刪除
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
