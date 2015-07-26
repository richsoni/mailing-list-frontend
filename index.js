"use strict";
let http = require('http');
let util = require('util');
let formidable = require('formidable');

let server = http.createServer(function(req, res) {
  console.log(1)
  switch(req.method){
    case "POST":
      var form = new formidable.IncomingForm(),
          fields = [];

      form
        .on('error', function(err) {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.end('error:\n\n'+util.inspect(err));
        })
        .on('field', function(field, value) {
          console.log(field, value);
          fields.push([field, value]);
        })
        .on('end', function() {
          console.log('-> post done');
          res.writeHead(200, {'content-type': 'text/plain'});
          res.end('received fields:\n\n '+util.inspect(fields));
        });
      form.parse(req);
      break;
    case "GET":
      res.writeHead(200, {'content-type': 'text/html'});
      res.end(
        '<form action="/post" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="text" name="data[foo][]"><br>'+
        '<input type="submit" value="Submit">'+
        '</form>'
      );
      break;
    default:
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('404');
  }
});
server.listen(3000);

console.log('listening on http://localhost:'+3000+'/');
