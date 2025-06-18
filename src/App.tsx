import React from 'react';
import './App.css';
import HotelList from './components/HotelList';
import HotelbedsList from './components/HotelbedsList';

function App() {
  return (
    <>
      <header className="App-header">
        <h1>飯店列表</h1>
        <HotelList />
        <HotelbedsList />
      </header>
    </>
  );
}

export default App;
