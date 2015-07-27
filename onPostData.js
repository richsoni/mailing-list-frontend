const formidable = require('formidable');
const util       = require('util');

module.exports = function(req, res, callback) {
  const form = new formidable.IncomingForm()
  const fields = []

  form.on('error', function(err) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('error:\n\n'+util.inspect(err));
  })

  form.on('field', function(field, value) {
    fields.push([field, value]);
  })

  form.on('end', function() {
    res.writeHead(201, {'content-type': 'text/plain'});
    res.end('201');
    callback(fields)
  })

  form.parse(req);
}
