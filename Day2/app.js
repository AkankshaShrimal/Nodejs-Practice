var express = require('express');           //Importing dependencies

const port = process.env.PORT || 3000;

var app = express();
app.use(express.json());


var courses = [                             // putting courses manually
    {id :1 ,name :'math'},
    {id :2 ,name :'sci'}]

app.get('/courses',function(req,res){
                              // to handle a get request for url '/courses'
    res.send(courses);
  
});

app.get('/courses/:id',(req,res)=>{                             // get request with parameters
    let result = courses.find(c => c.id == parseInt(req.params.id));
    if(!result)
        res.status(404).send("no such course");
    res.send(result);
})

app.post("/courses",(req,res)=>{                //simple post request (you can use chrome postman to execute them)
    const course = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course);
    res.send(course);
})


app.listen(port,function(){                              //starting a server at port 
    console.log("server started at port " + port + "...");
});

