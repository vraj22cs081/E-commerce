const express = require('express');
const router = express.Router();
const connection = require('../config/database');
// Registration route
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO Users(username, email, password) VALUES (?, ?, ?)";
    connection.query(sql, [username, email, password], (error, result) => {
        if (error) {
            console.error("Error inserting data: " + error);
            return res.status(500).send("Error inserting data");
        }
        if (result.affectedRows > 0) {
            console.log("Data inserted successfully");
            req.session.user = { username, email };
            res.status(200).send("All Ok");
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
            console.log("Login successful");
            req.session.user = { username, email: result[0].email };
            res.status(200).send("All Ok");
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
        res.status(200).send("Logged out successfully");
    });
});

module.exports = router;
