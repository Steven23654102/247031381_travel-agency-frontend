//AdminBookings.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
  _id: string;
  hotelName: string;
  checkInDate: string;
  nights: number;
  user?: { email: string }; // populated user
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('http://localhost:3000/api/admin/bookings', {

          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(res.data.bookings);
      } catch (err) {
        console.error('取得所有預約失敗', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h2>所有預約紀錄（Admin）</h2>
      {bookings.map(b => (
        <div key={b._id} style={{ backgroundColor: '#333', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
          <p><strong>用戶：</strong> {b.user?.email ?? '未知'}</p>
          <p><strong>飯店：</strong> {b.hotelName}</p>
          <p><strong>入住日：</strong> {b.checkInDate.slice(0, 10)}</p>
          <p><strong>晚數：</strong> {b.nights}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminBookings;
