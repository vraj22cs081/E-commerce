import React from 'react';
import styled from 'styled-components';
import ProductCard from './productCard';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ProductList = ({ products, addToCart, isAddedToCart }) => (
  <List>
    {products.map(product => (
      <ProductCard
        key={product.id}
        product={product}
        addToCart={addToCart}
        addedToCart={isAddedToCart(product.id)}
      />
    ))}
  </List>
);

export default ProductList;
