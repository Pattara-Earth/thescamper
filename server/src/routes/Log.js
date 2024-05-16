const express = require('express');
const router = express.Router();

// ---------------- api_log API Routes ----------------

// Handling GET request to retrieve all records from 'api_log' table
router.get('/api/api-log', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM api_log')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by api_log_id from 'api_log' table
router.get('/api/api-log/:api_log_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `api_log` WHERE api_log_id = ?', 
            req.params.api_log_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'api_log' table
router.post('/api/api-log', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.execute(
            'INSERT INTO `api_log` (log_time, method, url_endpoint, log_status, response, user_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [req.body.log_time, req.body.method, req.body.url_endpoint, req.body.log_status, req.body.response, req.body.user_id]
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by api_log_id in 'api_log' table
router.delete('/api/api-log/:api_log_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `api_log` WHERE api_log_id = ?',
            req.params.api_log_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})

// ---------------- prediction_log API Routes ----------------

// Handling GET request to retrieve all records from 'prediction_log' table
router.get('/api/prediction-log', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM prediction_log')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by pred_log_id from 'prediction_log' table
router.get('/api/prediction-log/:pred_log_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `prediction_log` WHERE pred_log_id = ?', 
            req.params.pred_log_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'prediction_log' table
router.post('/api/prediction-log', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.execute(
            'INSERT INTO `prediction_log` (log_time, inference_time, logit, log_status, response, user_id, admit_id) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [req.body.log_time, req.body.inference_time, req.body.logit, req.body.log_status, req.body.response, req.body.user_id, req.body.admit_id]
        )

        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by pred_log_id in 'prediction_log' table
router.delete('/api/prediction-log/:pred_log_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `prediction_log` WHERE pred_log_id = ?',
            req.params.pred_log_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})

module.exports = router;