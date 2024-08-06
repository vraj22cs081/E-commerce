const express = require('express');
const router = express.Router();
const connection = require('../config/database');  

router.get('/all', (req, res) => {
    const sql = 'SELECT * FROM Products';
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Error fetching products');
        }
        res.json(results);
    });
});

// Placing orders
// router.post('/order', (req, res) => {
//     const { user_id, products } = req.body;
//     const productIds = products.map(p => p.product_id);
//     const sql = "SELECT * FROM Products WHERE product_id IN (?)";
//     connection.query(sql, [productIds], (error, result) => {
//         if (error) {
//             console.error("Error executing query: " + error);
//             return res.status(500).send("Error executing query");
//         }

//         let totalPrice = 0;
//         const orderItems = [];

//         result.forEach(product_data => {
//             const { product_id, name, price, stock } = product_data;
//             const quantity = products.find(p => p.product_id === product_id).quantity;

//             if (quantity > stock) {
//                 return res.status(400).send(`Not enough stock for ${name}`);
//             }

//             totalPrice += price * quantity;
//             orderItems.push([null, product_id, quantity, price]);
//         });

//         // Insert order items into the database (assuming you have an OrderItems table)
//         const orderSql = "INSERT INTO OrderItems(order_id, product_id, quantity, price) VALUES ?";
//         connection.query(orderSql, [orderItems], (error, result) => {
//             if (error) {
//                 console.error("Error executing query: " + error);
//                 return res.status(500).send("Error executing query");
//             }
//             res.status(200).send("Order placed successfully");
//         });
//     });
// });

module.exports = router;
