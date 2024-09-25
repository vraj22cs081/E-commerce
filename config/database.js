const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) {
        console.log("Error in connecting to database:", err);
    } else {
        console.log("Database connected successfully");
    }
});

module.exports = connection;
