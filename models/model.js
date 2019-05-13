const mongoose = require('mongoose');

// Definizione dello schema per la creazione degli oggetti nel DB
var userSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    dateOfBirth: String,
    gender: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
