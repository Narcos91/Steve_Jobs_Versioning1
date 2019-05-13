
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Import base routes
const routes = require('./routes/index');
const usersRoutes = require('./routes/users');

// Database configuration
const host = 'localhost';
let dbName = 'SJ-testing-1';

if (process.env.NODE_ENV === 'test') {
  dbName = 'SJ-testing-1-test';
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://'+ host + '/' + dbName, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', function() {
  console.error('Connection error!');
});
db.once('open', function() {
  if (process.env.NODE_ENV !== 'test') {
    console.log('DB connection Ready');
  }
});

// Init express app
const app = express();

// Setup logger and body parser
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
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

module.exports = app;