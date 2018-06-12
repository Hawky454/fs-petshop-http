'use strict'
//provides API for interacting with file system
let fs = require('fs');
//path module handles and transforms file modules
let path = require('path');
//^imports the library
let petsPath = path.join(__dirname, 'pets.json');
// '/Users/DavidMiller/Projects/Galvanize_this/fs-pet-shop' + 'pets.json' (it concatinates)

let commands = ["read", "create", "update", "destroy"];

//path.basename retuns the last portion of a petsPath
//process.argv returns an array containing the command line arguments
let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let command = process.argv[2];

if (command === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      //stops execution of program if there is an error.
      throw err;
    }
    //turns string into an object
    let pets = JSON.parse(data);
    let age = process.argv[3];
    let kind = process.argv[4];
    let name = process.argv[5];
    let index = process.argv[3];
    let pet = {
      age,
      kind,
      name
    };


    if (index) {
      console.log(pets[index]);
    } else {
      console.log(pets);
    }
  });
} else if (command === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    let pets = JSON.parse(data);
    let pet = process.argv[3];
    let age = process.argv[3];

    if (!age) {
      console.error(`Usage: ${node} ${file} ${command} AGE`);
      process.exit(1);
    }

    pets.push(pets);

    let petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pets);
    });
  });
} else {
  console.log();
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
