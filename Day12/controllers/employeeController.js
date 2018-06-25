var mongoose = require('mongoose');

var employees = require('../models/employeeModel');           //DEFINING FUNCTIONS RELATED TO CUSTOMER

exports.create = function (req, res) {                   // EXPORTING FUNCTIONS
    var obj = {
        ID: req.body.id,
        name: req.body.name,
        age: req.body.age,
    }
    const instance = employees(obj);
    instance.save(function (err) {
        console.log("done")
        res.send("submitted");
    });
}


exports.display = function (req, res) {
    employees.find({}, function (err, docs) {
        if (err)
            throw err;
        res.send(docs);
    });

};
