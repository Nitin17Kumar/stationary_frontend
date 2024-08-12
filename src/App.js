import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Component/Home/Home';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import Admin from './Component/Admin/Admin';
import Detail from './Component/Detail/Detail';
import Config from './Admin/Config/Config';
import Analysis from './Admin/Analysis/Analysis';
import User from './Admin/User/User';
import Checkout from './Component/Checkout/Checkout';
import Pay from './Component/Pay/Pay';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/detail/:product_name" element={<Detail />} />
          <Route path="/admin/config" element={<Config />} />
          <Route path="/admin/analysis" element={<Analysis />} />
          <Route path="/admin/user" element={<User />} />

      </Routes>
    </div>
  );
}

export default App;
