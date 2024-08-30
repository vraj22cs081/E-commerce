import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import Cart from './components/cart/cart';
import AdminPanel from './pages/AdminPanel';
import SignUp from './components/login_details/signup';
import Login from './components/login_details/login';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<SignUp />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
    </Routes>
  </Router>
);

export default App;
