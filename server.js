const port = 3000
const fs = require('fs');
const path = require('path');

var express = require('express');
var app = express()

app.set('port', process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, 'public')));
var server = require('http').createServer(app)
server.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});

//create a route
app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});
