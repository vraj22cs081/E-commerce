import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import Cart from './components/cart/cart';
import AdminPanel from './pages/AdminPanel';
import SignUp from './components/login_details/signup';
import Login from './components/login_details/login';
import ProtectedRoute from './components/login_details/ProtectedRoute';
import Auth from './components/login_details/Auth'; // Updated import


const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/" element={<Auth />} />
      <Route path="/homepage" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/products" element={<ProtectedRoute element={<ProductsPage />} />} />
      <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
      <Route path="/adminpanel" element={<ProtectedRoute element={<AdminPanel />} />} />
    </Routes>
  </Router>
);

export default App;
