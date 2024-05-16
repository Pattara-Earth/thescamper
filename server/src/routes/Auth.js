const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'inpatient' // secret for generate json token

// ---------------- user API Routes ----------------

// Handling GET request to retrieve all records from 'user' table
router.get('/api/users', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM users')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by user_id from 'user' table
router.get('/api/users/:user_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `users` WHERE user_id = ?', 
            req.params.provider_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'user' table
router.post('/api/users', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('INSERT INTO `users` SET ?', req.body)
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by user_id in 'user' table
router.delete('/api/users/:user_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `users` WHERE user_id = ?',
            req.params.user_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})

// ---------------- Auth API Routes ----------------
// register
router.post('/api/register', async (req, res) => {
    try {
        const connect = req.db;
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.pass, saltRounds, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
        
        const result = await connect.query(
            'INSERT INTO `users` (user_id, email, pass, user_role) VALUES (?, ?, ?, ?)', 
            [req.body.user_id, req.body.email, hashedPassword, req.body.role]
        );
        
        res.json({status: 'ok', data: result[0]});
    } catch (err) {
        res.json({status: 'error', message: err});
    }
});

// login
router.post('/api/login', async (req, res) => {
    try {
        const connect = req.db;
        const result = await connect.query(
            'SELECT * FROM `users` WHERE email=?',
            [req.body.email]
        );
        if (result[0].length === 0) {
            return res.status(404).json({status: 'error', message: 'User not found' });
        }

        const user = result[0];
        const match = await bcrypt.compare(req.body.pass, user[0].pass);
        if (match) {
            // Passwords match, user authenticated
            res.json({status: 'ok', data: user})
        } else {
            // Passwords don't match
            res.status(401).json({status: 'error', message: 'Invalid email or password' });
        }
        
    } catch (err) {
        res.status(500).json({status: 'error', message: err});
    }
})

module.exports = router;