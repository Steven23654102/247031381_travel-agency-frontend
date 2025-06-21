import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Booking {
  _id: string;
  guestEmail: string;
  checkInDate: string;
  stayDays: number;
  note: string;
  rating: number;
  hotelId: {
    name: string;
    destination: string;
    minRate: number;
  };
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
    const navigate = useNavigate();

  const fetchBookings = () => {
    axios
      .get('http://localhost:3000/api/bookings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => setBookings(res.data))
      .catch(err => console.error('無法載入預約資料', err));
  };

  const deleteBooking = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // 移除刪除後的項目
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error('刪除失敗', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div
      style={{
        padding: '2rem',
        color: '#fff',
        minHeight: '100vh',
        backgroundColor: '#181818'
      }}
    >
      <h1 style={{ marginBottom: '2rem' }}>所有預約記錄</h1>

      {bookings.map(b => (
        <div
          key={b._id}
          style={{
            background: '#fff',
            color: '#000',
            borderRadius: '12px',
            padding: '1.5rem 2rem',
            width: '90%',
            maxWidth: '720px',
            margin: '0 auto 2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <p><strong>預約者：</strong>{b.guestEmail}</p>
          <p><strong>酒店：</strong>{b.hotelId?.name}</p>
          <p><strong>地址：</strong>{b.hotelId?.destination}</p>
          <p><strong>每晚價格：</strong>${b.hotelId?.minRate}</p>
          <p><strong>入住日期：</strong>{b.checkInDate}</p>
          <p><strong>入住天數：</strong>{b.stayDays} 天</p>
          <p><strong>備註：</strong>{b.note || '（無）'}</p>
          <p><strong>評分：</strong>{b.rating}</p>

          <button
            onClick={() => deleteBooking(b._id)}
            style={{
              marginTop: '1rem',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            刪除
          </button>

          <button
  onClick={() => navigate(`/admin/bookings/${b._id}/edit`)}
  style={{
    marginTop: '1rem',
    marginRight: '0.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  }}
>
  編輯
</button>

        </div>
      ))}
    </div>
  );
};

export default AdminBookings;
