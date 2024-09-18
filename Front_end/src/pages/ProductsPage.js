import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
// import TopNav from '../components/home/TopNav';
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
      // Create a new array to avoid mutating state directly
      const updatedCart = [...prevCart];
      
      // Find if the product is already in the cart
      const productIndex = updatedCart.findIndex(item => item.product_id === product.product_id);
  
      if (productIndex >= 0) {
        // Update quantity if the product is already in the cart
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: updatedCart[productIndex].quantity + quantity
        };
      } else {
        // Add new product to the cart
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
      <Header />
      <ProductList products={products} onAddToCart={handleAddToCart} />
      {cart.length > 0 && (
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      )}
      <Footer />
    </div>
  );
};

export default ProductsPage; 
