const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'e-commerce'
});

connection.connect(function (err) {
    if (err) {
        console.log("Error in connecting to database");
    } else {
        console.log("Database connected successfully");
    }
});

module.exports = connection;
