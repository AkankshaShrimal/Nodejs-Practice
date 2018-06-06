var express = require('express');
var router = express.Router();
var user = require('../models/user');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// get register
router.get('/register', (req, res) => {
    res.render('register');
});


// get login
router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/register', (req, res) => {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;


    // validation 
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password not matches').equals(req.body.password);

    var error = req.validationErrors();
    
    if (error) {
        res.render('register', { error: error });
    }
    else {
        var newUser = new user({
            name: name,
            email: email,
            username: username,
            password: password,
        });
        user.createUser(newUser, function (err, user) {
            if (err)
                throw err;
            console.log(user);
        });

        req.flash('success_msg', 'you are now registered and can now login');
        res.redirect('/users/login');
    }
});

//  USING PASSPORT FOR AUTHENTICATION

passport.use(new LocalStrategy(
    function (username, password, done) {

        user.getUserByUsername(username, function (err, userResult) {
            if (err)
                throw err;
            if (!userResult) {
                return done(null, false, { message: 'Unknown user' });
            }
            console.log(userResult.password);
            user.comparePassword(password, userResult.password, function (err, isMatch) {

                if (err)
                    throw err;
                if (isMatch) {
                    return done(null, userResult);
                }
                else {
                    return done(null, false, { message: 'invalid password' });
                }
            });

        });
    }));


passport.serializeUser(function (userResult, done) {
    done(null, userResult.id);
});

passport.deserializeUser(function (id, done) {

    user.getUserById(id, function (err, userResult) {
        done(err, userResult);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    // using local staratergy because of loacal database
    function (req, res) {
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success_msg', 'you are logged out');
    res.redirect('/users/login');
})


module.exports = router;