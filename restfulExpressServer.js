'use strict';

let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

let express = require('express');
let app = express();
let port = process.env.PORT || 8000;

let morgan = require('morgan');
let bodyParser = require('body-parser');

//disables that it's powered by Express
app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

//1st middlewar filter looking for /pets
app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error('err.stack');
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petsJSON);

    //this actually send response to terminal
    res.send(pets);
  });
});

//1st post excepting data to the database
app.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }
    //excepted POSTS age, kind, name
    let pets = JSON.parse(petsJSON);
    let age = req.body.age;
    let kind = req.body.kind;
    let name = req.body.name;

    let newPet = {
      age,
      kind,
      name
    };

    if (!age || !kind || !name) {
      return res.sendStatus(400);
    }
    pets.push(newPet);

    let newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON,(writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }
      res.set('Content-Type', 'application/json');
      res.send(newPet);
    });
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, newPetsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(newPetsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});
//middleware function request, response
app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log('Listen on port', port);
});

module.exports = app;
