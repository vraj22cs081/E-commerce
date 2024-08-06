// src/components/Cart.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const navigate = useNavigate();

  const handleOrderPlace = () => {
    // Logic for placing the order
    console.log('Order placed');
    navigate('/homepage');
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.name} - {item.quantity} x ${item.price}</p>
        </div>
      ))}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <button onClick={handleOrderPlace}>Place Order</button>
    </div>
  );
};

export default Cart;
