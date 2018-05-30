
//connecting mongodb with node.js using mongodb Driver and performing CRUD operations

const express = require('express');   
const bodyParser = require('body-parser');       
const morgan = require('morgan')
const port = process.env.PORT || 3000;
var app = express();    

const mongo = require('mongodb');         // importing mongo db 
const MongoClient = mongo.MongoClient;  // driver for mongodb 
var url = 'mongodb://localhost:27017';   // connection url specifically for version 3.x 
        
app.use(morgan('Dev'));  
app.use(bodyParser.json());            
app.use(bodyParser.urlencoded({extended: false}));  
app.use(express.static("public"));


MongoClient.connect(url, function(err, client) {            //Conneting to databse
              if(err)                   
                return console.log(err);
              
              console.log("Connected successfully to server");
              var db = client.db('customerData');           // getting database
            

            createDocuments(db);                // CREATE DOCUMENT
             readDocuments(db);             // READ DOCUMENT
             updateDocument(db);                 // UPDATE DOCUMENT
              deleteDocuments(db);                 //DELETE DOCUMENT
                  
              client.close();                 // closing databse
              
  });

function createDocuments(db) {

  // Insert some documents
      db.collection('customers').insertMany([       // Get the  collection and insert 
        {id:6, name : "rahul",age: 40},{id:7, name : "manan",age: 90}
      ], function(err) {
        if(err)                   
          return console.log(err);
        else
        console.log("Inserted 3 documents into the collection");
        
  });
}

function readDocuments(db)
{
    db.collection('customers').find({}).toArray(function(err, docs) {
        if(err)                   
              return console.log(err);
          else{
        console.log("Found the following records");
        console.log(docs)}
      });
}

function updateDocument(db) {
 
  db.collection('customers').update({ id : 2 }
    , { $set: { age : 23 } }, function(err) {
          if(err)                   
              return console.log(err);
            else
           console.log("Updated the document "); 
  });  
}

function deleteDocuments(db) {
  
  db.collection('customers').deleteOne({ id : 6 }, function(err) {
            if(err)                 
               console.log(err);
           else
               console.log("Removed the document ");

  });    
}


app.listen(port,function(){                              //starting a server at port 
    console.log("server started at port " + port + "...");
});
