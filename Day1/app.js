

var express = require('express');           //Importing dependencies
var bodyParser = require('body-parser');
var path = require('path');
const port = process.env.PORT || 3000;  // to set PORT write on terminal $export PORT=5000

var app = express();

var logger = function(req,res,next){                    // middleware functions that have acces to req and response
    console.log("logging...");
    next();
}

app.use(logger);

//Bodyparser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



app.get('/',function(req,res){
                              // to handle a get request for url '/'
    res.send("welcome");
 
});

app.get(/a/,function(req,res){
                              // to handle a get request for any url contaning a single a
    res.send(req.url);
 
});

app.get('/ab*c',function(req,res){
                              // to handle a get request for url ab123c, ab89c etc
    res.send(req.url);
 
});

app.get('/ab+c',function(req,res){
                              // to handle a get request for url abc , abbc, abbbc etc
    res.send(req.url);
 
});

app.get('/-:Id',function(req,res){
                              // to handle a get request  containing any parameter
    res.send("parameter used");
  
});

var people = { name : "akanksha"};

app.get('/object',function(req,res){
                              // to display a json object
    res.json(people);
 
});


app.listen(port,function(){                              //starting a server at port 3000
    console.log("server started at port " + port + "...");
});