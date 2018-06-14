'use strict'

let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

//using express.
let express = require('express');
console.log("Express obj:", express);
let app = express();
let port = process.env.PORT || 8000;

//hides that it's powered by Express.
app.disable('x-powered-by');

//experimenting with greeting
app.get("/hi", function (req, res) {
  let name = req.query.name;
  res.send("Hello, " + name);
});

//http GET localhost:8000/pets
app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petsJSON);
    res.set('Content-Type', 'application/json')
    res.status(200).send(pets);
  });
});

//http GET localhost:8000/pets/0 & /1
app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

//http GET localhost:8000/pets/-1 or /2
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});

app.post('/pets', function (req, res) {

})

app.use(function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
