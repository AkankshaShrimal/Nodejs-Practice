
const Joi = require('joi')  // returns a class, joi package for validation
const express = require('express');           //Importing dependencies
const port = process.env.PORT || 3000;
var app = express();

app.use(express.json());


var courses = [                             // putting courses manually
    {id :1 ,name :'math'},
    {id :2 ,name :'science'}]

app.get('/courses',function(req,res){
                              // to handle a get request for url '/courses'
    res.send(courses);
  
});

app.get('/courses/:id',(req,res)=>{                             // get request with parameters
    let searchResult = courses.find(c => c.id == parseInt(req.params.id));
    if(!searchResult)
       return res.status(404).send("no such course");
    res.send(searchResult);
})

app.post("/courses",(req,res)=>{                //simple post request (you can use chrome postman to execute them)
    
   const result = validateCourse(req.body); //validation using joi

    /* An alternate code to validate instead of joi 
                    if(!req.body.name || req.body.name.lemgth <3)
                    {//400 error for bad request
                            res.status(400).send("name is required for course");
                            return;
                        }
    */

      if(result.error)
                    {//400 error for bad request
                           return  res.status(400).send(result.error.details[0].message);
                        
                        }

    const course = {
                    id : courses.length + 1,
                    name : req.body.name
                }
                
    courses.push(course);
    res.send(course);
})

app.put("/courses/:id",(req,res)=>{         //put request for updating a given course

    // look up the course if not return 404
        let searchResult = courses.find(c => c.id == parseInt(req.params.id));
        if(!searchResult)
            return res.status(404).send("no such course");
    
    //validate , if not proper return 400 bad request error
         const result = validateCourse(req.body);
         if(result.error)
                    {//400 error for bad request
                           return res.status(400).send(result.error.details[0].message);
                            
                     }
    //update
        searchResult.name = req.body.name;
        res.send(searchResult);

})

app.delete("/courses/:id",(req,res)=>{
        //look for the given course
            let searchResult = courses.find(c => c.id == parseInt(req.params.id));
            if(!searchResult)
              return res.status(404).send("no such course");

        //delete the course
            var index = courses.indexOf(searchResult);
            courses.splice(index,1);

        //return course
        res.send("deleted  " + searchResult.name);
})
function validateCourse(course)
{
     const schema = {
                    name : Joi.string().min(3).required()
                     }
    return Joi.validate(course,schema);
}

app.listen(port,function(){                              //starting a server at port 
    console.log("server started at port " + port + "...");
});
