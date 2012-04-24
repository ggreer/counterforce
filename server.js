var express = require('express');
var settings = require('./settings');

var app = express.createServer(express.logger());

function check_commit(req, res) {
  res.send('cool story, bro');
}

app.get('/', check_commit);
app.post('/', check_commit);

console.log('listening on port', settings.port);
app.listen(settings.port);
