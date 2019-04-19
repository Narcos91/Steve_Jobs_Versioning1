const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: Array,
    dateOfBirth: Number,
    gender: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
