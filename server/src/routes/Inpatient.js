const express = require('express');
const router = express.Router();

// ---------------- providers API Routes ----------------

// Handling GET request to retrieve all records from 'providers' table
router.get('/api/providers', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM providers')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by provider_id from 'providers' table
router.get('/api/providers/:provider_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `providers` WHERE provider_id = ?', 
            req.params.provider_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'providers' table
router.post('/api/providers', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('INSERT INTO `providers` SET ?', req.body)
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by provider_id in 'providers' table
router.delete('/api/providers/:provider_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `providers` WHERE provider_id = ?',
            req.params.provider_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})

// ---------------- patient API Routes ----------------

// Handling GET request to retrieve all records from 'patient' table
router.get('/api/patient', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM patient')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by patient_id from 'patient' table
router.get('/api/patient/:patient_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `patient` WHERE patient_id = ?', 
            req.params.patient_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'patient' table
router.post('/api/patient', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('INSERT INTO `patient` SET ?', req.body)
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by patient_id in 'patient' table
router.delete('/api/patient/:patient_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `patient` WHERE patient_id = ?',
            req.params.patient_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})

// ---------------- icd10 API Routes ----------------

// Handling GET request to retrieve all records from 'icd10' table
router.get('/api/icd10', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM icd10')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by icd10_id from 'icd10' table
router.get('/api/icd10/:icd10_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `icd10` WHERE icd10_id = ?', 
            req.params.icd10_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'icd10' table
router.post('/api/icd10', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('INSERT INTO `icd10` SET ?', req.body)
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by icd10_id in 'icd10' table
router.delete('/api/icd10/:icd10_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `icd10` WHERE icd10_id = ?',
            req.params.icd10_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})

// ---------------- admission API Routes ----------------

// Handling GET request to retrieve all records from 'admission' table
router.get('/api/admission', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM admission')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by admit_id from 'admission' table
router.get('/api/admission/:admit_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `admission` WHERE admit_id = ?', 
            req.params.admit_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'admission' table
router.post('/api/admission', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('INSERT INTO `admission` SET ?', req.body)
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by admit_id in 'admission' table
router.delete('/api/admission/:admit_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `admission` WHERE admit_id = ?',
            req.params.admit_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})

// ---------------- services API Routes ----------------

// Handling GET request to retrieve all records from 'services' table
router.get('/api/services', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM services')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by service_id from 'services' table
router.get('/api/services/:service_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `services` WHERE service_id = ?', 
            req.params.service_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'services' table
router.post('/api/services', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('INSERT INTO `services` SET ?', req.body)
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by service_id in 'services' table
router.delete('/api/services/:service_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `services` WHERE service_id = ?',
            req.params.service_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})


// ---------------- admit_service API Routes ----------------

// Handling GET request to retrieve all records from 'admit_service' table
router.get('/api/admit-service', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM admit_service')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by admit_service_id from 'admit_service' table
router.get('/api/admit-service/:admit_service_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `admit_service` WHERE admit_service_id = ?', 
            req.params.pred_log_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'admit_service' table
router.post('/api/admit-service', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('INSERT INTO `admit_service` SET ?', req.body)
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by admit_service_id in 'admit_service' table
router.delete('/api/admit-service/:admit_service_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `admit_service` WHERE admit_service_id = ?',
            req.params.admit_service_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})

// ---------------- actions API Routes ----------------

// Handling GET request to retrieve all records from 'actions' table
router.get('/api/actions', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('SELECT * FROM actions')
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling GET request to retrieve record by action_id from 'actions' table
router.get('/api/actions/:action_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'SELECT * FROM `actions` WHERE action_id = ?', 
            req.params.action_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling POST request to create a new record in 'actions' table
router.post('/api/actions', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query('INSERT INTO `actions` SET ?', req.body)
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }
})

// Handling DELETE request to delete a record by action_id in 'actions' table
router.delete('/api/actions/:action_id', async (req, res) => {
    const connect = req.db;
    try {
        const results = await connect.query(
            'DELETE from `actions` WHERE action_id = ?',
            req.params.action_id
        )
        res.json({status: 'ok', data: results[0]})
    } catch (err) {
        res.json({status: 'error', message: err})
    }  
})

module.exports = router;