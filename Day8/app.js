
//connecting mongodb with node.js using mongodb Driver and performing CRUD operations

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const port = process.env.PORT || 3000;
var app = express();

const mongo = require('mongodb');         // importing mongo db 
const MongoClient = mongo.MongoClient // driver for mongodb 
    , Server = require('mongodb').Server;

app.use(morgan('Dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

var customerData;         // TO store collection customers

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.connect(function (err, mongoClient) {
    if (err)
        throw err;

    var db = mongoClient.db('customerData');        // getting database customerData
    customerData = db.collection('customers');      // getting collection customers
    console.log("connected successfully");

});

app.get('/customers', function (req, res) {

    customerData.find({}).toArray(function (err, docs) {        // to find all the customers
        if (err)
            return res.status(500).send(err);

        console.log("Found the following records");
        console.log(docs);
        res.send(docs.map(ele => ele.id + " " + ele.name));
    });
});

app.get("/customers/:id", function (req, res) {        // to find a paticular customer by id

    console.log(req.params.id);
    customerData.find({ "id": parseInt(req.params.id) }).toArray(function (err, items) {

        if (err)
            res.status(500).send(err);
        else
            res.send(items.map(ele => ele.id + " " + ele.name));;
    })
});

app.post("/submitted", (req, res) => {             // To add a new customer to the collection
    console.log(req.body);
    var myobj = { id: parseInt(req.body.id), name: req.body.name, age: req.body.age };
    customerData.insert(myobj);
    res.send("submitted");

})



app.listen(port, function () {                              //starting a server at port 
    console.log("server started at port " + port + "...");
});
