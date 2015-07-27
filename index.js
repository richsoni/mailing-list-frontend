"use strict";
const http       = require('http');
const fs         = require("fs")
const onPostData = require("./onPostData")

const PORT     = 3004
const getHTML  = fs.readFileSync('./form.html')

http.createServer(function(req, res) {
  switch(req.method){
    case "POST":
      onPostData(req, res, function(body) {
        console.log(body)
      })
      break;
    case "GET":
      console.log(req.url)
      res.writeHead(200, {'Content-Type': 'text/html','Content-Length':getHTML.length});
      res.write(getHTML);
    default:
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('404');
  }
}).listen(PORT);

console.log('listening on http://localhost:'+PORT+'/');
