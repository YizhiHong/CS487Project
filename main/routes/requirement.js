var express = require('express');
var router = express.Router();

/* GET requirement page. */

router.get('/RSD', function(req, res, next) {
    res.render('RSD', {
        title: 'High School Book Tracking Application - Requirement Specification Document', users:!!req.session._id ,
        layout:'layout-login'

    });
});


/* GET requirement page. */

router.get('/DSD', function(req, res, next) {
    res.render('DSD', {
        title: 'High School Book Tracking Application - Requirement Specification Document',users:!!req.session._id ,
        layout:'layout-login'
    });
});


module.exports = router;
