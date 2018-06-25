var express = require('express');
var router = express.Router();

var customerController = require("../controllers/customerController");

router.get('/display', customerController.display);         // ROUTE TO DISPLAY CUSTOMERS

router.post('/create', customerController.create);          // ROUTE TO CREATE CUSTOMERS


module.exports = router;
