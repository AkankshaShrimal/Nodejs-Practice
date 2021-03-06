var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://localhost/companyData", function (err) {        //CONNECTING TO DATABASE
    if (err)
        throw err;
    console.log("successfully connected");
});

var userSchema = mongoose.Schema({         // DEFINING  SCHEMA  
    username: {
        type: String,
        index: true,
    },
    password: {
        type: String,

    },
    email: {
        type: String,

    },
    name: {
        type: String,

    },
});

var user = module.exports = mongoose.model('user', userSchema);         //CREATING MODEL

//DEFINING VARIOUS METHODS

module.exports.createUser = function (newUser, callback) {

    bcrypt.genSalt(10, function (err, salt) {               // To convert password into hash 
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });

};

module.exports.getUserByUsername = function (username, callback) {
    var query = { username: username };
    user.findOne(query, callback);

};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {       // For authentication
        if (err)
            throw err;

        callback(null, isMatch);

    })
};

module.exports.getUserById = function (id, callback) {
    user.findById(id, callback);
};