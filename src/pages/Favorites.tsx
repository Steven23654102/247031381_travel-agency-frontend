import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/hotels/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(res.data);
    };
    fetchFavorites();
  }, []);

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h2>我的收藏飯店</h2>
      <div className="hotel-container">
        {favorites.map((fav, i) => (
          <div className="hotel-card" key={i}>
            <strong>{fav.hotelId.name}</strong>
            <p>地址：{fav.hotelId.destination}</p>
            <p>價格：${fav.hotelId.minRate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
