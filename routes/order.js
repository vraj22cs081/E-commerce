const express = require('express');
const router = express.Router();
const db = require('../config/database');  // Ensure you have the correct database configuration

// Order route
router.post('/orders', async (req, res) => {
    const { total_price, cart } = req.body;
    console.log('Session in /orders route:', req.session.user_id);
    const user_id = req.session.user_id;
    // const user_id = 1;
    console.log('User session after login:', user_id);

    // Check product stock
    try {
        // Loop through each product in the cart to check stock availability
        const stockChecks = await Promise.all(
            cart.map(item => {
                return new Promise((resolve, reject) => {
                    const stockQuery = 'SELECT stock FROM products WHERE product_id = ?';
                    db.query(stockQuery, [item.product_id], (err, results) => {
                        if (err) {
                            console.error('Error checking product stock:', err);
                            reject(err);
                        } else {
                            const availableStock = results[0]?.stock;
                            if (availableStock < item.quantity) {
                                reject(new Error(`Insufficient stock for product ${item.name}`));
                            } else {
                                resolve({ product_id: item.product_id, newStock: availableStock - item.quantity });
                            }
                        }
                    });
                });
            })
        );

        // If all stock checks pass, proceed with order creation
        const orderQuery = 'INSERT INTO orders (user_id, total_price) VALUES (?, ?)';
        db.query(orderQuery, [user_id, total_price], (err, result) => {
            if (err) {
                console.error('Error saving order:', err);
                return res.status(500).json({ error: 'Failed to save order' });
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
                    } else {
                        // Update product stock
                        const stockUpdatePromises = stockChecks.map(stockUpdate => {
                            const updateStockQuery = 'UPDATE products SET stock = ? WHERE product_id = ?';
                            return new Promise((resolve, reject) => {
                                db.query(updateStockQuery, [stockUpdate.newStock, stockUpdate.product_id], (err) => {
                                    if (err) {
                                        console.error('Error updating stock:', err);
                                        reject(err);
                                    } else {
                                        resolve();
                                    }
                                });
                            });
                        });

                        // Wait for all stock updates to finish
                        Promise.all(stockUpdatePromises)
                            .then(() => {
                                res.status(200).json({ message: 'Order placed successfully and stock updated', order_id });
                            })
                            .catch((stockError) => {
                                console.error('Error during stock update:', stockError);
                                res.status(500).json({ error: 'Order placed but failed to update stock' });
                            });
                    }
                });
            }
        });
    } catch (stockError) {
        console.error('Error during stock check:', stockError.message);
        res.status(400).json({ error: stockError.message });
    }
});

module.exports = router;
