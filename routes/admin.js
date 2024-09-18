const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Adjust path as needed
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Limit file size to 1MB
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Route to handle adding a product
router.post('/add-product', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err);
        }

        const { name, description, price, stock } = req.body;
        const image = req.file ? req.file.filename : null;

        const sql = 'INSERT INTO Products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)';
        
        db.query(sql, [name, description, price, stock, image], (err, result) => {
            if (err) {
                console.error('Error inserting product:', err);
                return res.status(500).send('Error inserting product');
            }
            res.send('Product added successfully');
        });
    });
});

// Route to handle updating a product
router.post('/update-product', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('File upload error:', err); // Log the error for debugging
            return res.status(400).send(err);
        }

        // Log the entire request body to see what's coming in
        console.log('Request body:', req.body); // Debugging: Log request body
        console.log('Uploaded file:', req.file); // Debugging: Log uploaded file

        const { id, name, description, price, stock } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!id) {
            console.error('Product ID is missing'); // Log the missing ID
            return res.status(400).send('Product ID is required');
        }

        let sql = 'UPDATE Products SET name = ?, description = ?, price = ?, stock = ?';
        let params = [name, description, price, stock];

        if (image) {
            sql += ', image = ?';
            params.push(image);
        }

        sql += ' WHERE product_id = ?';
        params.push(id);

        console.log('SQL Query:', sql); // Debugging: Log the SQL query
        console.log('Query Parameters:', params); // Debugging: Log the SQL parameters

        db.query(sql, params, (err, result) => {
            if (err) {
                console.error('Error updating product:', err); // Log the error for debugging
                return res.status(500).send('Error updating product');
            }
            res.send('Product updated successfully');
        });
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
