
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const Express = require("express");
const cors = require("cors");

const CONNECTION_URL = "mongodb+srv://MongoDB:testpass222%21@cluster0-moa1z.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "testdb";
const fileUpload = require("express-fileupload");

const port = 3001

var app = Express();
/*
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
*/

var database, collection;


app.listen(port, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
      if(error) {
          throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("people"); //table
      studentCollection = database.collection("students");
      console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});

app.use(BodyParser.json({type:"*/*"}));
//app.use(cors(corsOptions))


//Register a route using HTTP

//Inserts uploaded file data to the 'students' database
app.post("/insert", (req, res) => {
    
    console.log(req.body);
    studentCollection.insert(req.body, (error, result) => {
      if (error) {
        return req.status(500).send(error);
      }
      //res.send(result.result);
    });

    console.log(req.body);
    //res.send(req.body);
    res.sendStatus(200);
         
});

//Retrieves student from 'students' database with UIN parameter
app.get("/student/:uin", (req, res) => {
  studentCollection.findOne({uin: req.params.uin}, (err, studentInfo) => {
      
      if (err) {
        return res.status(500).send(err);
      }
      res.send(studentInfo);
  });
});

//Finds a matching student based on UIN and updates
//the checkIn feild to be true
app.get("/updateCheckin/:uin", (req, res) => {
  //findAndModify(query, sort, doc[,options], callback)
  studentCollection.findAndModify(
    {uin: req.params.uin}, //query
    [['_id', 'asc']],      //sort order
    {$set: {checkIn: 'Yes'}}, //replacement, replaces only the field "checkIn"
    {}, //options
    (err, studentInfo) => {
      if (err){
        return res.status(500).send(err) //returns error if user not found
      }

        res.send(studentInfo.value)
    
    });
});


//Retrieves student from 'students' database with UIN parameter
app.post("/insertStudent", (req, res) => {
  console.log(req.body);
  studentCollection.insert(req.body, (err, studentInfo) => {
      
      if (err) {
        return res.status(500).send(err);
      }
       
      res.send(studentInfo.result);
  });
});

//Gets all the students from the database
app.get("/students", (request, response) => {
  studentCollection.find({}).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

//Empties the collection 
app.post("/clearAll", (req, res) => {
  studentCollection.deleteMany({}, (error, result) =>{
    if (error){
      return req.status(500).send(error);
    }
  })
});

app.post("/countTotal", (req, res) => {
  studentCollection.count({}, (error, result) =>{
    if (error){
      return req.status(500).send(error);
    }
    res.send(result);
  });
});


/*
app.post("/person", (request, response) => {
  collection.insert(request.body, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result.result);
  });
});
*/

/*
app.listen(port, () => {
  console.log(`Server started! Listening on port ${port}!`);
})
*/




