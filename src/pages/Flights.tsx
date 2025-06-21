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
    <div style={{ padding: '2rem', color: '#fff', maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>機票查詢</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value.toUpperCase())}
          placeholder="出發地（LAX）"
          style={{ padding: '0.5rem', flex: 1 }}
        />
        <input
          value={to}
          onChange={(e) => setTo(e.target.value.toUpperCase())}
          placeholder="目的地（JFK）"
          style={{ padding: '0.5rem', flex: 1 }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '0.5rem' }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#00bcd4',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {loading ? '搜尋中…' : '搜尋'}
        </button>
      </div>

      {results.length === 0 && !loading && <p>— 無結果 —</p>}

      {results.map((f, idx) => {
        const flight = f.flights?.[0];
        return (
          <div
            key={idx}
            style={{
              border: '1px solid #444',
              backgroundColor: '#1e1e1e',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              boxShadow: '0 0 5px rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {flight?.airline_logo && (
                  <img src={flight.airline_logo} alt="logo" height={30} />
                )}
                <strong>{flight?.airline || '未知航空'}</strong>
              </div>
              <span style={{ fontWeight: 'bold', color: '#00e5ff' }}>
                {f.duration?.text ? `✈ ${f.duration.text}` : ''}
              </span>
            </div>

            <div style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
              {from} {f.departure_time} → {to} {f.arrival_time}
            </div>

            {f.price && (
              <div style={{ marginTop: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                價格：<span style={{ color: '#ffd54f' }}>${f.price}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Flights;
