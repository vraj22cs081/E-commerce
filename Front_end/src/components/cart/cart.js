import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PageBackground = styled.div`
  background-color: #f1f1f1; /* Light gray background for the page */
  min-height: 100vh; /* Full height */
  padding: 40px 0; /* Add some padding to space out the cart */
`;

const CartContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4d6882 0%, #6a88a5 100%); 
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
`;

const CartHeader = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 30px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background-color: #394f6d; /* Dark blue header */
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 2px solid #7a8ba0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: #556780;
    border-radius: 10px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const CartItemName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: #fff;
  background-color: #4a617b; /* Slightly lighter than background */
  padding: 8px 15px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CartItemQuantity = styled.span`
  color: #d4d9e2;
  font-size: 1rem;
  margin-top: 5px;
`;

const CartItemPrice = styled.span`
  font-size: 1.2rem;
  color: #fff;
  font-weight: 600;
  background-color: #4a617b; /* Slightly lighter than background */
  padding: 8px 15px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TotalPrice = styled.div`
  margin-top: 30px;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: right;
  color: #fff;
  background-color: #394f6d;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const BackButton = styled.button`
  padding: 12px 30px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }
`;

const ConfirmButton = styled.button`
  padding: 12px 30px;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #218838;
  }
`;

const GenerateInvoiceButton = styled.button`
  padding: 12px 30px;
  background-color: #ffc107;
  color: black;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e0a800;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cart = state?.cart || [];
  const total_price = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

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
        body: JSON.stringify({ total_price, cart }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'Insufficient stock for some products') {
          let stockMessage = 'The following items have insufficient stock:\n';
          data.insufficientStockItems.forEach(item => {
            stockMessage += `Product: ${item.name}, Available: ${item.availableQuantity}, Requested: ${item.requestedQuantity}\n`;
          });
          alert(stockMessage);
        } else {
          throw new Error('Failed to place order: ' + data.error);
        }
      } else {
        alert('Order placed successfully!');
        setOrderConfirmed(true);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while confirming the order.');
    }
  };

  const handleGenerateInvoice = async () => {
    if (!orderConfirmed) {
      alert('Please confirm your order first.');
      return;
    }

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
      navigate('/homepage');
      alert('Invoice generated and emailed successfully!');
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  return (
    <PageBackground>
      <CartContainer>
        <CartHeader>Your Shopping Cart</CartHeader>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#fff' }}>Your cart is empty</p>
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
            <TotalPrice>Total: ${total_price.toFixed(2)}</TotalPrice>
            <ButtonContainer>
              <BackButton onClick={handleBackToProducts}>Back to Products</BackButton>
              <ConfirmButton onClick={handleConfirmOrder}>Confirm Order</ConfirmButton>
              <GenerateInvoiceButton onClick={handleGenerateInvoice} disabled={!orderConfirmed}>
                Generate Invoice
              </GenerateInvoiceButton>
            </ButtonContainer>
          </>
        )}
      </CartContainer>
    </PageBackground>
  );
};

export default Cart;
