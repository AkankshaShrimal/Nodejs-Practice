const mongoose = require('mongoose');

var employeeSchema = require('../schema/employee');             // IMPORTING REQUIRED SCHEMA

var employees = mongoose.model('employees', employeeSchema);            // CREATING MODEL


module.exports = employees;                                             // EXPORTING MODEL