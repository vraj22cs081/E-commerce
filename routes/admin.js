const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Adjust path as needed

// Route to handle adding a product
router.post('/add-product', (req, res) => {
    const { name, description, price, stock } = req.body;

    const sql = 'INSERT INTO Products (name, description, price, stock) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [name, description, price, stock], (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(500).send('Error inserting product');
        }
        res.send('Product added successfully');
    });
});
//Product update route
router.post('/update-product', (req, res) => {
    const { id, name, description, price, stock } = req.body;
    if (!id) {
        return res.status(400).send('Product ID is required');
    }
    const sql = 'UPDATE Products SET name = ?, description = ?, price = ?, stock = ? WHERE product_id = ?';
    db.query(sql, [name, description, price, stock, id], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).send('Error updating product');
        }
        res.send('Product updated successfully');
    });
});

// Route to get all registered users
router.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Error fetching users' });
        }
        res.json(results);
    });
});

// Route to get all product information
router.get('/products', (req, res) => {
    const sql = 'SELECT * FROM Products';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Error fetching products' });
        }
        res.json(results);
    });
});
module.exports = router;
