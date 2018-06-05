const mongoose = require('mongoose');  


var customerSchema = mongoose.Schema({         // DEFINING CUSTOMER SCHEMA  

    customerID : {
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
console.log("schema created");
 // any static functions common for model must be defined here only

module.exports = customerSchema;                // EXPORTING SCHEMA 