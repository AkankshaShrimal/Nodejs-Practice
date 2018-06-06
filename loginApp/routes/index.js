var express = require('express');
var router = express.Router();

// get homepage
router.get('/', ensureAuthenticated, (req, res) => {
    res.render("index");
})


//To redirect directly to '/users/login'
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        // req.flash('error_msg','you are not logged in');
        res.redirect('/users/login');
    }

}

module.exports = router;