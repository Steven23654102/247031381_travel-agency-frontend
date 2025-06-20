// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import AddHotel from './pages/AddHotel';
import HotelList from './pages/HotelList';
import Account from './pages/Account';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import Favorites from './pages/Favorites';
import Flights from './pages/Flights';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotels/new" element={<AddHotel />} />
        <Route path="/hotels/list" element={<HotelList />} />
        <Route path="/account" element={<Account />} />
        <Route path="/hotels/:id/booking" element={<Booking />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/favorites" element={<Favorites />} />
  <Route path="/flights" element={<Flights />} />
    <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

