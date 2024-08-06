// src/components/QuantityControl.js
import React from 'react';
import styled from 'styled-components';

const Control = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: #ff8c00;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1em;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: #ffa500;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  border: 1px solid #000;
  margin: 0 5px;
`;

const QuantityControl = ({ quantity, setQuantity }) => {
  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(Math.max(0, quantity - 1));

  return (
    <Control>
      <Button onClick={decrease}>-</Button>
      <QuantityInput type="text" value={quantity} readOnly />
      <Button onClick={increase}>+</Button>
    </Control>
  );
};

export default QuantityControl;
