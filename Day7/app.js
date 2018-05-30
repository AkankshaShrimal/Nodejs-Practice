
//connecting mongodb with node.js using mongodb Driver and performing CRUD operations

const express = require('express');   
const bodyParser = require('body-parser');       
const morgan = require('morgan')
const port = process.env.PORT || 3000;
var app = express();    

const mongo = require('mongodb');         // importing mongo db 
const MongoClient = mongo.MongoClient  , Server = require('mongodb').Server;         // driver for mongodb 
       
app.use(morgan('Dev'));  
app.use(bodyParser.json());            
app.use(bodyParser.urlencoded({extended: false}));  
app.use(express.static("public"));


var mongoClient = new MongoClient(new Server('localhost', 27017));		//connecting to mongodb
mongoClient.connect(function(err, mongoClient) {
	if(err)
     	 	throw err;
	
  var db = mongoClient.db('customerData');
   
            createDocuments(db);                // CREATE DOCUMENT
             readDocuments(db);             // READ DOCUMENT
             updateDocument(db);                 // UPDATE DOCUMENT
              deleteDocuments(db);                 //DELETE DOCUMENT
                  
              mongoClient.close();                 // closing databse
              
  });

function createDocuments(db) {

  // Insert some documents
      db.collection('customers').insertMany([       // Get the  collection and insert 
        {id:6, name : "rahul",age: 40},{id:7, name : "manan",age: 90}
      ], function(err) {
        if(err)                   
          	throw err;
        
        console.log("Inserted 3 documents into the collection");
        
  });
}

function readDocuments(db)
{
    db.collection('customers').find({}).toArray(function(err, docs) {
         if(err)                   
          	throw err;

        console.log("Found the following records");
        console.log(docs)
      });
}

function updateDocument(db) {
 
  db.collection('customers').update({ id : 2 }
    , { $set: { age : 23 } }, function(err) {
           if(err)                   
          	throw err;

           console.log("Updated the document "); 
  });  
}

function deleteDocuments(db) {
  
  db.collection('customers').deleteOne({ id : 6 }, function(err) {
             if(err)                   
          	throw err;

             console.log("Removed the document ");

  });    
}


app.listen(port,function(){                              //starting a server at port 
    console.log("server started at port " + port + "...");
});
