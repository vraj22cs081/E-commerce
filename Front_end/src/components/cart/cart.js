import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const CartHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItemName = styled.span`
  font-weight: bold;
`;

const CartItemQuantity = styled.span`
  color: #666;
`;

const CartItemPrice = styled.span`
  color: #333;
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;
const GenerateInvoiceButton = styled.button`
  padding: 10px 20px;
  background-color: #ffc107;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cart = state?.cart || [];
  const total_price = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleBackToProducts = () => {
    navigate('/products', { state: { cart } });
  };

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch('http://localhost:9000/order/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ total_price }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      alert('Order placed successfully!');
      console.log('Order placed:', data);

      // Optionally clear the cart or navigate to a success page
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleGenerateInvoice = async () => {
    try {
      const response = await fetch('http://localhost:9000/order/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to generate invoice');
      }

      const data = await response.json();
      alert('Invoice generated and emailed successfully!');
      console.log('Invoice:', data);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  return (
    <CartContainer>
      <CartHeader>Cart</CartHeader>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <CartList>
            {cart.map((item, index) => (
              <CartItem key={item.product_id || index}>
                <CartItemDetails>
                  <CartItemName>{item.name}</CartItemName>
                  <CartItemQuantity>Quantity: {item.quantity}</CartItemQuantity>
                </CartItemDetails>
                <CartItemPrice>${item.price * item.quantity}</CartItemPrice>
              </CartItem>
            ))}
          </CartList>
          <TotalPrice>Total: ${total_price}</TotalPrice>
          <ButtonContainer>
            <BackButton onClick={handleBackToProducts}>Back to Products</BackButton>
            <ConfirmButton onClick={handleConfirmOrder}>Confirm Order</ConfirmButton>
            <GenerateInvoiceButton onClick={handleGenerateInvoice}>Generate Invoice</GenerateInvoiceButton>
          </ButtonContainer>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
