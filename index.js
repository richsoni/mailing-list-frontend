"use strict";
const http = require('http');
const onPostData = require("./onPostData")

const PORT = 3000

http.createServer(function(req, res) {
  switch(req.method){
    case "POST":
      onPostData(req, res, function(body) {
        console.log(body)
      })
      break;
    default:
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('404');
  }
}).listen(PORT);

console.log('listening on http://localhost:'+PORT+'/');
