const mongoose = require('mongoose');

var customerSchema = require('../schema/customer');                 // IMPORTING REQUIRED SCHEMA

var customers = mongoose.model('customers', customerSchema);        // CREATING MODEL
console.log("model created");

module.exports = customers;                                         // EXPORTING MODEL