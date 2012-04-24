var express = require('express');
var settings = require('./settings');

var app = express.createServer();

console.log('listening on port', settings.port);
app.listen(settings.port);
