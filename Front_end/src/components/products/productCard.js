import React, { useState } from 'react';
import styled from 'styled-components';
import QuantityControl from './QuntityControl';

const Card = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--nord3);
  border-radius: 8px;
  background-color: #ffffff;
  color: var(--nord6);
  margin: 10px;
  width: 1200px;
  padding: 10px;
  height: 350px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  background-color: #e0e0e0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  margin-right: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Content = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
  color: #000;
`;

const Details = styled.p`
  font-size: 1em;
  color: #000;
  margin-bottom: 40px;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 4px;
`;

const Price = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  color: #000;
`;

const AddToCartButton = styled.button`
  background-color: ${props => (props.added ? '#28a745' : '#ff8c00')};
  color: #fff;
  border: none;
  padding: 10px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: ${props => (props.added ? '#218838' : '#ffa500')};
  }
`;

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(product, quantity);
      setAddedToCart(true);
    }
  };

  return (
    <Card>
      <ImageWrapper>
        <Image src={product.image_url} alt={product.name} />
      </ImageWrapper>
      <Content>
        <Title>{product.name}</Title>
        <Details>{product.description}</Details>
        <Price>Price: ${product.price}</Price>
        <QuantityControl quantity={quantity} setQuantity={setQuantity} />
        <AddToCartButton
          disabled={quantity === 0 || addedToCart}
          onClick={handleAddToCart}
          added={addedToCart} 
        >
          {addedToCart ? 'Added to Cart' : 'Add to Cart'}
        </AddToCartButton>
      </Content>
    </Card>
  );
};

export default ProductCard;
