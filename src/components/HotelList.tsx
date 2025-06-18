import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Hotel {
  name: string;
  category: string;
  destination: string;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/hotels/hotelbeds?city=PAR')
      .then(res => setHotels(res.data.hotels))
      .catch(err => console.error('Error fetching hotels:', err));
  }, []);

  return (
    <div>
      {hotels.length === 0 ? (
        <p>載入中...</p>
      ) : (
        <ul>
          {hotels.map((hotel, index) => (
            <li key={index}>
              <strong>{hotel.name}</strong><br />
              類型：{hotel.category}<br />
              城市代碼：{hotel.destination}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotelList;
