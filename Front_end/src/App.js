import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AdminPanel from './pages/AdminPanel';

const App = () => (
  <Router>
    <Routes>
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
    </Routes>
  </Router>
);

export default App;
