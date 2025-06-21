// src/pages/EditBooking.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBooking: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState('');
  const [rating, setRating] = useState(5);
  const [checkInDate, setCheckInDate] = useState('');
  const [stayDays, setStayDays] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        const { note, rating, checkInDate, stayDays } = res.data;
        setNote(note || '');
        setRating(rating);
        setCheckInDate(checkInDate.slice(0, 10)); // YYYY-MM-DD
        setStayDays(stayDays);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/bookings/${id}`, {
      note,
      rating,
      checkInDate,
      stayDays
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    navigate('/admin/bookings');
  };

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2> 編輯預約</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>備註：</label><br />
          <textarea value={note} onChange={e => setNote(e.target.value)} />
        </div>
        <div>
          <label>評分（1~5）：</label><br />
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
          />
        </div>
        <div>
          <label>入住日期：</label><br />
          <input
            type="date"
            value={checkInDate}
            onChange={e => setCheckInDate(e.target.value)}
          />
        </div>
        <div>
          <label>入住天數：</label><br />
          <input
            type="number"
            min={1}
            value={stayDays}
            onChange={e => setStayDays(Number(e.target.value))}
          />
        </div>
        <br />
        <button type="submit" style={{ background: 'green', color: 'white', padding: '6px 12px' }}>
          儲存變更
        </button>
      </form>
    </div>
  );
};

export default EditBooking;
