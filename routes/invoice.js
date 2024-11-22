const express = require('express');
const router = express.Router();
const db = require('../config/database');
const nodemailer = require('nodemailer');

// Configure nodemailer transport
const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
        user: 'vs1010792@gmail.com',
        pass: 'pinh bbqg rgoo jiqg', 
    },
});

// Route to generate and email invoice
router.post('/invoice', (req, res) => {
    const user_id = req.session.user_id;
    const user_email = req.session.email;

    // Validate session
    if (!user_id || !user_email) {
        return res.status(400).json({ error: 'User not logged in or session expired' });
    }

    // Query to fetch the latest order items for the logged-in user
    const getOrderItemsQuery = `
        SELECT oi.order_id, p.product_id, p.name, oi.quantity, p.price
        FROM orderitems oi
        JOIN products p ON oi.product_id = p.product_id
        WHERE oi.order_id = (
            SELECT order_id 
            FROM orders 
            WHERE user_id = ?
            ORDER BY order_id DESC 
            LIMIT 1
        )
    `;

    db.query(getOrderItemsQuery, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching order items:', err);
            return res.status(500).json({ error: 'Error fetching order items' });
        }

        if (!results.length) {
            return res.status(404).json({ error: 'No order found for the user' });
        }

        // Calculate total price
        const totalPrice = results.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Create email content with enhanced CSS
        const invoiceHtml = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                        color: #333;
                        padding: 20px;
                    }
                    .invoice-container {
                        max-width: 800px;
                        margin: auto;
                        background-color: #fff;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header h1 {
                        margin: 0;
                        color: #007bff;
                        font-size: 2.5em;
                    }
                    .header h2 {
                        margin: 0;
                        font-size: 1.5em;
                        color: #555;
                    }
                    .invoice-details, .invoice-items {
                        margin-bottom: 20px;
                    }
                    .invoice-details div, .invoice-items table {
                        margin-bottom: 10px;
                    }
                    .invoice-items table {
                        width: 100%;
                        border-collapse: collapse;
                        background-color: #f9f9f9;
                    }
                    .invoice-items th, .invoice-items td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: left;
                    }
                    .invoice-items th {
                        background-color: #007bff;
                        color: white;
                        text-transform: uppercase;
                    }
                    .total-price {
                        text-align: right;
                        font-weight: bold;
                        font-size: 1.5em;
                        margin-top: 20px;
                        border-top: 2px solid #007bff;
                        padding-top: 10px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                    }
                    .footer p {
                        margin: 0;
                        font-size: 0.9em;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="invoice-container">
                    <div class="header">
                        <h1>Maruti Enterprise</h1>
                        <h2>Invoice</h2>
                    </div>
                    <div class="invoice-details">
                        <div><strong>Invoice Number:</strong> #${results[0].order_id}</div>
                        <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                        <div><strong>Customer ID:</strong>${user_id}</div>
                    </div>
                    <div class="invoice-items">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${results.map(item => `
                                    <tr>
                                        <td>${item.product_id}</td>
                                        <td>${item.name}</td>
                                        <td>${item.quantity}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="total-price">
                        <strong>Total Amount:</strong> $${totalPrice.toFixed(2)}
                    </div>
                    <div class="footer">
                        <p>Thank you for your business!</p>
                        <p>Maruti Enterprise, 1234 Main St, Anytown, USA</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Send email
        const mailOptions = {
            from: 'vs1010792@gmail.com',
            to: user_email,
            subject: 'Your Invoice from Maruti Enterprise',
            html: invoiceHtml,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send invoice email' });
            }

            res.status(200).json({ message: 'Invoice generated and emailed successfully' });
        });
    });
});

module.exports = router;