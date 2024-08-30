const express = require('express');
const router = express.Router();
const db = require('../config/database');  // Ensure you have the correct database configuration

// Order route
router.post('/orders', (req, res) => {
    const { total_price,cart } = req.body;
    console.log('Session in /orders route:', req.session);
    // const user_id=req.session.user?.user_id;
    const user_id=1;
    console.log('User session after login:', user_id);

    console.log('Inserting order with User ID:', user_id, 'and Total Price:', total_price);

    const query = 'INSERT INTO orders (user_id, total_price) VALUES (?, ?)';
    db.query(query, [user_id, total_price], (err, result) => {
        if (err) {
            console.error('Error saving order:', err);
            res.status(500).json({ error: 'Failed to save order' });
        } else {
            const order_id = result.insertId;
            console.log('Order ID:', order_id);

            // Insert each item into the orderitems table
            const orderItems = cart.map(item => [
                order_id,
                item.product_id,
                item.quantity,
                item.price
            ]);
        
            const itemsQuery = 'INSERT INTO orderitems (order_id, product_id, quantity, price) VALUES ?';
            db.query(itemsQuery, [orderItems], (err) => {
                if (err) {
                console.error('Error saving order items:', err);
                return res.status(500).json({ error: 'Failed to save order items' });
                }else {
            res.status(200).json({ message: 'Order placed successfully', order_id });
            }
        });
        }
    });
});



// Order items route
// router.post('/order-items', (req, res) => {
//     const { order_id, product_id, quantity, price } = req.body;
    
//     const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
//     db.query(query, [order_id, product_id, quantity, price], (err, result) => {
//         if (err) {
//             console.error('Error saving order item:', err);
//             res.status(500).json({ error: 'Failed to save order item' });
//         } else {
//             res.status(200).json({ message: 'Order item saved successfully' });
//         }
//     });
// });

module.exports = router;
