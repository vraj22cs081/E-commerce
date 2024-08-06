import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import TopNav from '../components/home/TopNav';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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

  const addToCart = (product, quantity) => {
    setCart(prevCart => [...prevCart, { ...product, quantity }]);
  };

  const handleCheckout = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div>
      <TopNav />
      <Header />
      <ProductList products={products} addToCart={addToCart} />
      {cart.length > 0 && (
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      )}
      <Footer />
    </div>
  );
};

export default ProductsPage;
