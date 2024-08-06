const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    console.log("Server is started");
    res.sendFile(path.resolve(__dirname, '../public/src/pages/HomePage.js'));
});

module.exports = router; 
