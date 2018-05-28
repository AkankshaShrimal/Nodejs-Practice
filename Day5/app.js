
const express = require('express');   
const bodyParser = require('body-parser');     
const morgan = require('morgan')     //used for logging and Debugging (beter than console.log )  
const cookieParser = require('cookie-parser');      // for cookies optional
const session = require('express-session');          // for session management required  
const port = process.env.PORT || 3000;
var app = express(); 

app.use(morgan('Dev'));  //Dev fo development environment
app.use(cookieParser());
app.use(session({secret:'anystringoftext',         //not necessary to use cookie parser with it in latest version
                saveUninitialized : true,           //manages session as well as cookies
                   resave : true }));                            
app.use(bodyParser.json());            
app.use(bodyParser.urlencoded({extended: false}));      
app.use(express.static('public'));

app.get('/user',(req,res)=>{
    
    var sess = req.session;
    
    if(sess.email)
    {
        
        res.redirect('/loggedUser');
    }
    else
    {
        res.send("no user");
    }
    });

app.post('/form',(req,res)=>{
var sess = req.session;                                      // session object and attributes set
sess.email = req.body.email;
sess.password = req.body.password;
console.log(sess );
res.redirect("/user");                      //page redirected

});

app.get('/loggedUser',(req,res)=>{
    var sess = req.session;
    res.end("welcome  " + sess.email);
    
});

app.get('/logout',(req,res)=>{
    //Destroying session object 
                            req.session.destroy(function(err) {
                            if(err) 
                                console.log(err);
                            else
                                res.send("end");})});

app.listen(port,function(){                              //starting a server at port 
    console.log("server started at port " + port + "...");
});
