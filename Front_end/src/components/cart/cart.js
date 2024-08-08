import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cart = state?.cart || [];

  const handleBackToProducts = () => {
    navigate('/products', { state: { cart } });
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity} - Price: ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={handleBackToProducts}>Back to Products</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
