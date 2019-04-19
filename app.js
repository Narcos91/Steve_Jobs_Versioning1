// Stabiliamo la connessione con il DB di Mongo

const host = 'localhost';
const dbName = 'dbUser';

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${host}/${dbName}`);

var db = mongoose.connection;
db.on('error', function() {
    console.error('Connection error!')
});
db.once('open', function() {
    console.log('DB connection Ready');
});

var User = require('./models/model');
applicationCache.addEventListener(3001)
module.exports=app;
