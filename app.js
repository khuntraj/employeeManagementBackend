const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const employeeRoutes = require('./api/routes/employee')

mongoose.connect('mongodb://localhost:27017').then(
    console.log('database')
);

app.use(bodyParser.json())
app.use('/employee', employeeRoutes);







module.exports = app;