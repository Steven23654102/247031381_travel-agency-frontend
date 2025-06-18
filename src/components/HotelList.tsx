import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Hotel {
  name: string;
  city: string;
  price: number;
  image: string;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/hotels')
      .then(res => setHotels(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>MongoDB 飯店列表</h2>
      {hotels.map((hotel, index) => (
        <div key={index} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
          <h3>{hotel.name}</h3>
          <p>城市：{hotel.city}</p>
          <p>價格：${hotel.price}</p>
          {hotel.image && <img src={hotel.image} alt={hotel.name} width="200" />}
        </div>
      ))}
    </div>
  );
};

export default HotelList;
