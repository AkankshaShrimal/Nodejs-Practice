
//connecting mongodb with node.js using mongoose and performing CRUD

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const port = process.env.PORT || 3000;
var app = express();

const mongoose = require('mongoose');   // Impporting mongoose

app.use(morgan('Dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost/customerData", function (err) {   // Connecting to database
    if (err)
        throw err;
    console.log("successfully connected");
})

var customerSchema = mongoose.Schema({         // Defining mongoose schema basically a blueprint

    name: {
        first: String,
        last: String,
    },
    age: String,

});

var customermodel = mongoose.model('customerModel', customerSchema);       // Making a model(collection) by schema

app.post('/submitted', (req, res) => {

    var obj = {
        name: {
            first: req.body.first,
            last: req.body.last,
        },
        age: req.body.age,
    }
    const instance = customermodel(obj);        // creating a document inside the model 
    instance.save(function (err) {
        console.log("done")
        res.send("submitted");
    });
});

app.get('/customers', (req, res) => {
    // Getting all documents inside the model 
    customermodel.find({}, function (err, docs) {
        if (err)
            throw err;
        res.send(docs);
    });
});

app.post('/update', (req, res) => {       // updating a document inside the model 

    /*   SEARCHING BY ID   
     customermodel.findById(mongoose.Types.ObjectId(req.body.id), function (err, docs) {
         if (err)
             throw err;
         console.log(docs);
         res.send(docs);
     });}); */

    //SEARCHING BY NAME
    customermodel.findOneAndUpdate({
        name: {
            "first": req.body.first,
            "last": req.body.last
        }
    }, { age: req.body.age }, { upsert: true, new: false }, function (err, docs) {
        if (err)
            throw err
        console.log(docs);
        res.send("updated");
    });
});

app.post('/delete', (req, res) => {
    customermodel.deleteOne({           // delete a document from the model 
        name: {
            "first": req.body.first,
            "last": req.body.last
        }
    }, function (err, docs) {
        if (err)
            throw err
        console.log(docs);
        res.send("deleted");
    });

});


app.listen(port, function () {                              //starting a server at port 
    console.log("server started at port " + port + "...");
});
