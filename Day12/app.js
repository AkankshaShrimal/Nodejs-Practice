// CREATING MODULAR PROJECT USING EXPRESS ROUTER

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 3000;
const mongoose = require('mongoose');
const app = express();

var customerRouter = require('./routes/customerRoute');             // IMPORTING VARIOUS ROUTES
var employeeRouter = require('./routes/employeeRoute');

app.use(morgan('Dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/customer',customerRouter);                               // LINKING ROUTES
app.use('/employee',employeeRouter);

mongoose.connect("mongodb://localhost/companyData", function (err) {        //CONNECTING TO DATABASE
    if (err)
        throw err;
    console.log("successfully connected");
})

app.listen(port, function () {                             		 
    console.log("server started at port " + port + "...");
});

