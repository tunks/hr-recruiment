/* require libries */
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var port = 5000;

app.use(cookieParser());
//public directories configuration
app.use('/bower_components',  express.static( path.join('/bower_components')));
app.use('/css',  express.static( path.join(__dirname + '/css')));
app.use('/js',  express.static( path.join(__dirname + '/js')));
app.use('/img',  express.static( path.join(__dirname + '/img')));
app.use('/lib',  express.static( path.join(__dirname + '/lib')));
//authenticate user request
app.use('/',express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


http.listen(port, function(){
    console.log('listening on *:',port);
});



