// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import TopNav from '../components/home/TopNav';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:9000/products/all'); // Update the URL if you have an endpoint to fetch products by category
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <TopNav />
      <Header />
      <ProductList products={products} />
      <Footer />
    </div>
  );
};

export default ProductsPage;
