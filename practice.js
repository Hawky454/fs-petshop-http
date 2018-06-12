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

  if(commands.indexOf(command) > -1)
  //what command was typed in?
   if(command === 'read') {
     
} else {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}
