// frontend/src/pages/Booking.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Hotel {
  _id: string;
  name: string;
  destination: string;
  minRate: number;
  phone: string;
  description: string;
}

const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);

  // 預約表單欄位
  const [checkInDate, setCheckInDate] = useState('');
  const [stayDays, setStayDays] = useState(1);
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/hotels/${id}`)
      .then(res => setHotel(res.data))
      .catch(err => console.error('無法取得酒店資料', err));
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/hotels/bookings', {
        hotelId: hotel?._id,
        guestEmail: localStorage.getItem('email') || 'guest@example.com',
        checkInDate,
        stayDays,
        note,
        rating
      });
      setMessage(' 預約成功！');
    } catch (err) {
      setMessage(' 預約失敗');
    }
  };

  if (!hotel) return <p style={{ color: 'white' }}>載入中...</p>;

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>{hotel.name}</h2>
      <p><strong>地址：</strong>{hotel.destination}</p>
      <p><strong>價格：</strong>${hotel.minRate}</p>
      <p><strong>電話：</strong>{hotel.phone}</p>
      <p><strong>簡介：</strong>{hotel.description}</p>

      <hr />
      <h3>預約入住</h3>
      <form onSubmit={handleBooking} style={{ marginTop: '1rem' }}>
        <label>
          入住日期：
          <input
            type="date"
            value={checkInDate}
            onChange={e => setCheckInDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          入住天數：
          <input
            type="number"
            value={stayDays}
            onChange={e => setStayDays(Number(e.target.value))}
            required
          />
        </label>
        <br />
        <label>
          備註：
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </label>
        <br />
        <label>
          評分：
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
          />
        </label>
        <br />
        <button type="submit">送出預約</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Booking;
