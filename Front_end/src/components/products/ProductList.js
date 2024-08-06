// src/components/ProductList.js
import React from 'react';
import styled from 'styled-components';
import ProductCard from './productCard';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ProductList = ({ products }) => (
  <List>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </List>
);

export default ProductList;
