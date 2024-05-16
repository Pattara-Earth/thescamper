const express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql2/promise');
require('dotenv').config();
var app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 3000; // Define port

let connect = null // hold the database connection

// Initialize MySQL connection function
const initMySQL = async () => {
    connect = await mysql.createConnection({
        host     : process.env.SQLHOST,
        user     : process.env.SQLUSER,
        password : process.env.SQLPASSWORD,
        database : process.env.SQLDATABASE,
        port: process.env.SQLPORT
    })
}

// Middleware to attach database connection to request object
app.use(async (req, res, next) => {
    try {
        if (!connect) {
            await initMySQL();
        }
        req.db = connect;
        next();
    } catch (err) {
        next(err);
    }
});

const authRoute = require("./src/routes/Auth");
const inpatientRoute = require("./src/routes/Inpatient");
const log = require("./src/routes/Log");
app.use("/auth", authRoute)
app.use("/inpatient", inpatientRoute)
app.use("/log", log)

// Starting Express server to listen on port 
app.listen(port, async (req, res) => {
    await initMySQL()
    console.log('CORS-enabled rest api server listening on port ' + port)
})
