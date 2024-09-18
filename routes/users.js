const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// Registration route
router.post('/signup', (req, res) => { 
    const { username, email, password } = req.body;
    const sql = "INSERT INTO Users(username, email, password) VALUES (?, ?, ?)";
    connection.query(sql, [username, email, password], (error, result) => {
        if (error) {
            console.error("Error inserting data: " + error);
            return res.status(500).send("Error inserting data");
        }
        if (result.affectedRows > 0) {
            res.status(200).send({ message: "Registration successful" });
        }
    }); 
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM Users WHERE username = ? AND password = ?";
    connection.query(sql, [username, password], (error, result) => {
        if (error) {
            console.error("Error executing query: " + error);
            return res.status(500).send("Error executing query");
        }
        if (result.length > 0) {
            const { user_id ,email } = result[0];
            req.session.user_id = user_id; 
            req.session.email = email;
            req.session.save(err => {
                if (err) {
                    console.error("Error saving session:", err);
                    return res.status(500).send("Error saving session");
                }
                res.status(200).send({ message: 'Login successful', user_id: user_id, email: email });
            });
        } else {
            res.status(401).send("Invalid credentials"); 
        }
    }); 
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.status(200).send({ message: "Logged out successfully", redirect: '/login' });
    });
});

module.exports = router;
