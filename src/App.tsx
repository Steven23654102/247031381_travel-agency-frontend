import React from 'react';
import './App.css';
import HotelList from './components/HotelList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>飯店列表</h1>
        <HotelList />
      </header>
    </div>
  );
}

export default App;

