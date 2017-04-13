var express = require('express');
var router = express.Router();

/* GET requirement page. */

router.get('/RSD', function(req, res, next) {
    res.render('requirement', {
        title: 'High School Book Tracking Application - Requirement Specification Document', users:!!req.session._id ,
        layout:'layout-login'

    });
});


/* GET requirement page. */

router.get('/DSD', function(req, res, next) {
    res.render('DSD', {
<<<<<<< HEAD
        title: 'High School Book Tracking Application - Design Specification Document',
=======
        title: 'High School Book Tracking Application - Requirement Specification Document',users:!!req.session._id ,
>>>>>>> 3b9c1c8edaafb551463d0860e262b39333e11182
        layout:'layout-login'
    });
});


module.exports = router;
