import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
// import TopNav from '../components/home/TopNav';
import Product_Header from '../components/products/Product_Header';
import Footer from '../components/home/Footer';
import styled from 'styled-components';

const CheckoutButton = styled.button`
  background-color: #28a745; /* Success button color */
  color: white;
  padding: 10px 20px;
  margin: 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #218838; /* Darker shade on hover */
  }
`;

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:9000/products/all');
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

  const handleAddToCart = (product, quantity) => {
    console.log('Adding to cart:', product, quantity);
  
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex(item => item.product_id === product.product_id);
  
      if (productIndex >= 0) {
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: updatedCart[productIndex].quantity + quantity
        };
      } else {
        updatedCart.push({ ...product, quantity });
      }
  
      console.log('Updated cart:', updatedCart);
      return updatedCart;
    });
  };

  const handleCheckout = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div>
      {/* <TopNav /> */}
      <Product_Header />
      <ProductList products={products} onAddToCart={handleAddToCart} />
      {cart.length > 0 && (
        <div class="d-grid gap-2 col-6 mx-auto">
          <CheckoutButton onClick={handleCheckout}>
            Proceed to Checkout
          </CheckoutButton>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default ProductsPage;
