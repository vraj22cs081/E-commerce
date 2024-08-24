import React, { useState } from 'react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = { name, price, description, stock };

    fetch('http://localhost:9000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Product added:', data);
      // Reset form fields
      setName('');
      setPrice('');
      setDescription('');
      setStock('');
    })
    .catch(error => console.error('Error adding product:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Stock:</label>
        <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
