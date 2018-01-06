var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("test.json");
var db = low(adapter);
db.defaults({notes: []})
  .write();

app.use(bodyParser.json()); 

low(adapter)
  .then(db => {
    app.get("/getNote", (req, res) => {
      db.get("getNote")
        .write()
      res.end()
      })
    
    app.post("/updateNote/:value", (req, res) => {
      value = req.params.value
      db.get("notes")
        .push(value)
        .write()
      res.end()
    })

    app.use((req, res, next) => {
      res.status(404).send("Sorry, I couldn't find it")
    })
    
  })


  .then(() => {
    app.listen(3000, () => console.log("Listening on port 3000"))
  })
