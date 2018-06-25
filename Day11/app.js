
// USING Q LIBRARY FOR HANDLING PROMISES

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 3000;
const app = express();
var Q = require('q');               			// importing q library


app.use(morgan('Dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



function first(val) {

    var deferred = Q.defer();                       	// getting deferred object 
    var promise = deferred.promise;                		 // creating promise
	
    setTimeout(function () {
        console.log("1");
        if (val) {
            deferred.resolve();  				// resolving promise
            console.log("executed");
        }
        else
            deferred.reject(); 				// rejecting promise by calling this                                                 
    }, 3000);
    return promise;                             	  // returning promise                      
}

function second(val) {
    var deferred = Q.defer();                       
    var promise = deferred.promise;

    setTimeout(function () {
        console.log("2");
        if (val) {
            deferred.resolve();
            console.log("executed");
        }
        else
            deferred.reject();				// rejecting promise by calling this 

        
    }, 3000);
    return promise;
}

function third(val) {
    var deferred = Q.defer();                      
    var promise = deferred.promise;

    setTimeout(function () {
        console.log("3");
        if (val) {
            deferred.resolve();
            console.log("executed");
        }

        else
            deferred.reject();

    }, 3000);
    return promise;
}

function fourth(val) {
    var deferred = Q.defer();                   
    var promise = deferred.promise;

    setTimeout(function () {
        console.log("4");
        if (val) {
            deferred.resolve();
            console.log("executed");
        }
        else
            deferred.reject();
    }, 3000);
    return promise;
}



var combined = Q.all([first(1), second(1)]);             // function executed together using .all() function
combined.then(function () {
    console.log("done ");
}).catch(function (err) {
    console.log(err);
});


app.get('/:val', (req, res) => {

    third(parseInt(req.params.val))                     // returning a promise      
        .then(function () {
            console.log("done ");
            res.send("done");

        }).catch(function (err) {
            console.log("failed");
            res.send('failed');

        });

})

app.get('/chain/:val', (req, res) => {

    first(parseInt(req.params.val))                     	// chaining of promises avoiding callback hell    
        .then(second(parseInt(req.params.val)))
        .then(third(parseInt(req.params.val)))
        .then(fourth(parseInt(req.params.val)))
        .catch(function (err) {
            console.log("failed");
            res.send('failed');
        });
    res.send("chaining");
})


app.listen(port, function () {                             		 //starting a server at port 
    console.log("server started at port " + port + "...");
});
