var express = require('express');
var router = express.Router();

var employeeController = require('../controllers/employeeController');

router.get('/display', employeeController.display);        //  ROUTE TO DISPLAY EMPLOYEES

router.post('/create', employeeController.create);          // ROUTE TO DISPLAY EMPLOYEES

module.exports = router;
