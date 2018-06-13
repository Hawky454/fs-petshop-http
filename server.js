'use strict';

let fs = require('fs');
let path = require('path');
let guestsPath = path.join(__dirname, 'guests.json');

let http = require('http');
let port = process.env.PORT || 8000;

let server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(guestsJSON);
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});
//need to study more...
