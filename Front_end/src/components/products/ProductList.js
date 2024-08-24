import React from 'react';
import styled from 'styled-components';
import ProductCard from './productCard';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ProductList = ({ products, onAddToCart }) => (
  <List>
    {products.map(product => (
      <ProductCard
        key={product.id}
        product={product}
        onAddToCart={onAddToCart}
      />
    ))}
  </List>
);

export default ProductList;
