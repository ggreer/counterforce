var express = require('express');
var settings = require('./settings');

var app = express.createServer(express.logger());

function check_commit(req, res) {
  var forced;
  var payload;

  res.send('cool story, bro');
  console.log(req.body);

  if (req.body && req.body.payload) {
    payload = JSON.parse(req.body.payload);
    console.log(payload);
    if (payload.forced) {
      console.log("OH SHIIIIIIIIIT");
      
    }
  }
}

app.use(express.bodyParser());
app.get('/', check_commit);
app.post('/', check_commit);

console.log('listening on port', settings.port);
app.listen(settings.port);
