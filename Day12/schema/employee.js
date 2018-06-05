const mongoose = require('mongoose');  


var employeeSchema = mongoose.Schema({                  // EMPLOYEE SCHEMA 

    ID : {
        type : String,
        unique : true,
        required : true,

    },
    name: {
        type: String,
        required: true,
    },
    age: String,

});
 
 // any static functions common for model must be defined here only
module.exports = employeeSchema;                         // EXPORTING SCHEMA 