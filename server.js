const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");


const adapter = new FileAsync("test.json");
app.use(bodyParser.json()); 

low(adapter)
  .then(db => {
    db.defaults({notes: []})
      .write();

    app.get("/getNote", (req, res) => {
      const note = db.get("notes")
        .value();
        res.send(note);
    });
    
    app.post("/updateNote/:value", (req, res) => {
      value = req.params.value;
      db.get("notes")
        .push(value)
        .write();
      res.end();
    });

    app.use((req, res, next) => {
      res.status(404).send("Sorry, I couldn't find it");
    });
    
  })
  .then(() => {
    app.listen(3000, () => console.log("Listening on port 3000"));
  });
