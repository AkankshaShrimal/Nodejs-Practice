
const express = require('express');   
const bodyParser = require('body-parser');       
const morgan = require('morgan')    
const cookieParser = require('cookie-parser');       
const session = require('express-session');           
const port = process.env.PORT || 3000;
var app = express(); 

app.use(morgan('Dev'));  
app.use(cookieParser());
app.use(bodyParser.json());            
app.use(bodyParser.urlencoded({extended: false}));   //session always after body-parser
app.use(session({secret:'keyboard cat',         
                saveUninitialized : true,           
                   resave : true,
                 cookie: {path: '/', httpOnly: true,  maxAge:60000,secure: false } }));                            
   

app.get('/',(req,res)=>{
console.log(req.session.id);
   if(req.session.username)
   {
       req.session.count +=1;
        res.send(req.session);
   } 
   else
   {
       req.session.username = "akanksha"
       req.session.count = 1;
       res.send(req.session);
   }
});


app.listen(port,function(){                              //starting a server at port 
    console.log("server started at port " + port + "...");
});
