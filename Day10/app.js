
// mongoose advance utility- validators, getters, setters, middleware- document and query level, static methods, instance methods

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const port = process.env.PORT || 3000;
var app = express();

const mongoose = require('mongoose');  							 // Importing mongoose

app.use(morgan('Dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect("mongodb://localhost/customerData", function (err) {   		// Connecting to database
    if (err)
        throw err;
    console.log("successfully connected");
})

var customerSchema = mongoose.Schema({        					 // use of BUILT-IN validators (required,min,max,maxlenth,enum etc)
    customerID: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        maxlength: 10,
        required: true
    },
    age: {
        type: String,
        min: 20,
        max: 90
    },
    post: {
        type: String,
        default: "engineer",
    },
    email:
    {
        type: String,
        set: (v) => { return v.toLowerCase(); },              	 /* SETTER METHOD -value from query and stores in mongodb by setting*/


    },

    password: {                           			 // GETTER METHOD - takes values from mongodb and display in diffrent way 
        type: String, get: (cc) => { var r; for (i = 0; i < cc.length; i++) { r = r + "*" }; return r; }
    }

});


customerSchema.post('save', function (next) {            		// use of document middleware for advanced validation 
    // type post middleware 	
    // this refers to document  
    if (this) {
        console.log("created");
        next();

    }
});

customerSchema.pre('find', function (next) {            		// use of query middleware 
    // type pre middleware 
    // this refers to document 

    if (this) {

        console.log(this.getQuery());
        next();

    }
});

customerSchema.statics.findByAge = function (givenAge) {           	 // using static methods
    return new Promise((resolve, reject) => {
        this.find({ age: givenAge }, (err, docs) => {
            if (err) {
                console.error(err)
                return reject(err)
            }
            resolve(docs)
        })
    })
}

customerSchema.methods.getInitials = function () {       	// INSTANCE methods unique for object 
    return (this.name[0]);     // this refers to object 
}

var customermodel = mongoose.model('customerModel', customerSchema);
app.get('/put', (req, res) => {
    var obj = {
        customerID: "14",
        name: "sahaa",
        age: "40",
        email: "bByy65C@gmail.com",         // setter method called here 
        password: "451234r5675",
    }

    var instance = new customermodel(obj);
    instance.save((err) => {
        if (err)
            throw err;
        else
            res.send("done");
    });

});

app.get('/findBy/:age', (req, res) => {
    customermodel.findByAge(req.params.age).then(docs => {  			 // static method called for model 
        docs.forEach(function (element) {
            console.log(element.getInitials());					 // instance method called for each instance
        });
        console.log(docs);
        res.send(docs);
    })
        .catch(err => {
            console.error(err)
        })


});

app.get('/customers', (req, res) => {
    // Getting all documents inside the model 
    customermodel.find({}, function (err, docs) {
        if (err)
            throw err;
        res.send(docs);
    });
});

app.get('/customers/:id', (req, res) => {

    customermodel.find({ customerID: req.params.id }, function (err, docs) {
        if (err)
            throw err;
        else {

            console.log(docs[0].password);      // getter method called here
            res.send(docs[0].password);
        }
    });
});


app.listen(port, function () {                              //starting a server at port 
    console.log("server started at port " + port + "...");
});
