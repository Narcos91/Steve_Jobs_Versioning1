var mongoose = require ('mongoose');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


// Import base routes
const routes = require('./routes/index');
const usersRoutes = require('./routes/users');

// Database configuration
const host = 'localhost';
let dbName = 'SJ-testing-1';

mongoose.connect('mongodb://'+ host + '/' + dbName, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', function() {
  console.error('Connection error!');
});
db.once('open', function() {
    console.log('DB connection Ready');
 
});

// Init express app
var app = express();

// Setup logger and body parser

app.use(bodyParser.json());

// Setup static public folder
    app.use(express.static(path.join(__dirname, 'public')));

// Setup base routes
app.use('/', routes);
app.use('/users', usersRoutes);

// Catch 404 errors
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
      .json({message: err.message, error: err});
});

var User = require ('./models/model');
app.listen (3001)
module.exports = app;