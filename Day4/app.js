
const express = require('express');   
const bodyParser = require('body-parser');              // body-parser necessary to capture incoming request
        //Importing dependencies
const port = 3000;

var app = express();                   
app.use(bodyParser.json());             //to parse incoming request into json - middleware
app.use(bodyParser.urlencoded({extended: false}));      //to parse incoming request into x-www-urlencoded-format(simple text or ascii) - middleware
app.use(express.json());
app.use("/static",express.static("public")); //creating virtual url for getting to static files /static

var courses = [                             
    {id :1 ,name :'math'},
    {id :2 ,name :'science'}]

app.get('/courses',function(req,res){                            // to handle a get request for url '/courses'
    res.send(courses);  
});

app.get('/courses/:id',(req,res)=>{                             // get request with parameters
    let searchResult = courses.find(c => c.id == parseInt(req.params.id));
    if(!searchResult)
       return res.status(404).send("no such course");
    res.send(searchResult);
})

app.post("/courses",(req,res)=>{                //simple post request 
    console.log(req.body);
    
courses.push(req.body);
 res.send("submitted");
    
})
                   

app.listen(port,function(){                              //starting a server at port 
    console.log("server started at port " + port + "...");
});
