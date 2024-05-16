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
        const results = await connect.execute(
            'INSERT INTO `providers` (fname, lname, provider_role) VALUES (?, ?, ?)', 
            [req.body.fname, req.body.lname, req.body.provider_role]
        );
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
        const results = await connect.execute(
            'INSERT INTO `patient` (fname, lname, dob, sex, drug_allergy VALUES (?, ?, ?, ?, ?)', 
            [req.body.fname, req.body.lname, req.body.dob, req.body.sex, req.body.drug_allergy]
        )
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
        const results = await connect.execute(
            'INSERT INTO `admission` (admit_date, room_num, admit_status, diagnosis, icd10_id, patient_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [req.body.admit_date, req.body.room_num, req.body.admit_status, req.body.diagnosis, req.body.icd10_id, req.body.patient_id]
        )
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
        const results = await connect.execute(
            'INSERT INTO `services` (service_time, service_type, servive_name, detail, service_status, provider_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [req.body.service_time, req.body.service_type, req.body.servive_name, req.body.detail, req.body.service_status, req.body.provider_id]
        )
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
        const results = await connect.execute(
            'INSERT INTO `admit_service` (admit_id, service_id) VALUES (?, ?)', 
            [req.body.admit_id, req.body.service_id]
        )
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
        const results = await connect.execute(
            'INSERT INTO `actions` (action_time, action_type, action_name, action_status, admit_id) SET (?, ?, ?, ?, ?)', 
            [req.body.action_time, req.body.action_type, req.body.action_name, req.body.action_status, req.body.admit_id]
        )
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