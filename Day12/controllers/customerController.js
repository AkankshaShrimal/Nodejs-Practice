var mongoose = require('mongoose');

var customers = require('../models/customerModel');

var create = function (req, res) {                      //DEFINING FUNCTIONS RELATED TO CUSTOMER
    var obj = {
        customerID: req.body.id,
        name: req.body.name,
        age: req.body.age,
    }
    const instance = customers(obj);
    instance.save(function (err) {
        console.log("done")
        res.send("submitted");
    });
}


var display = function (req, res) {
    customers.find({}, function (err, docs) {
        if (err)
            throw err;
        res.send(docs);
    });

};

module.exports =  {                                         // EXPORTING FUNCTIONS
  create : create,
  display : display,
};