import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import Cart from './components/cart/cart';
import AdminPanel from './pages/AdminPanel';

const App = () => (
  <Router>
    <Routes>
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
      <Route path="/" element={<Navigate to="/homepage" />} />
    </Routes>
  </Router>
);

export default App;
