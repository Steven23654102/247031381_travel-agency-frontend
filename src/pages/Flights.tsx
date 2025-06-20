// frontend/src/pages/Flights.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Flight {
  departure_time?: string;
  arrival_time?: string;
  duration?: { text: string };
  price?: number;
  flights?: {
    airline: string;
    airline_logo?: string;
  }[];
}

const Flights: React.FC = () => {
  const [from, setFrom] = useState('LAX');
  const [to, setTo] = useState('JFK');
  const [date, setDate] = useState('2025-07-07');
  const [results, setResults] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/flights/search', {
        params: { from, to, date },
      });

      console.log(' Raw response:', res.data);

      const flights: Flight[] = [
        ...(res.data?.data?.itineraries?.topFlights ?? []),
        ...(res.data?.data?.itineraries?.otherFlights ?? []),
      ];

      setResults(flights);
    } catch (err: any) {
      alert(`搜尋失敗：${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2>機票查詢</h2>

      <input value={from} onChange={(e) => setFrom(e.target.value.toUpperCase())} />
      <input value={to} onChange={(e) => setTo(e.target.value.toUpperCase())} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? '搜尋中…' : '搜尋'}
      </button>

      {results.length === 0 && !loading && <p>— 無結果 —</p>}

      {results.map((f, idx) => {
        const flight = f.flights?.[0];
        return (
          <div
            key={idx}
            style={{
              border: '1px solid #555',
              margin: '1rem 0',
              padding: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {flight?.airline_logo && (
                <img src={flight.airline_logo} alt="logo" height={30} />
              )}
              <strong>
                {flight?.airline || '未知航空'}
                {f.duration?.text ? `（${f.duration.text}）` : ''}
              </strong>
            </div>

            <p>
              {from} {f.departure_time} → {to} {f.arrival_time}
            </p>
            {f.price && <p>價格：${f.price}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Flights;
