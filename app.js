//app.js

//modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    config = require('./config/conf'),
    fs = require('fs');

//Config express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config websockets with socket.io
var http = require('http').Server(app),
    io = require('socket.io')(http);

//Controller
require('./controller/eliza.js')(io);

//Send html to client
app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/index.html');
});

//Launch server
http.listen(config.port, function(){
    if (config.log) console.log("Magic happens on port: " + config.port);
});

//Export functions for test
exports.listen = function () {
  http.listen(config.port);
};

exports.close = function (callback) {
  http.close();
};
