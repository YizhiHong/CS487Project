var express = require('express');
var router = express.Router();

/* GET requirement page. */

router.get('/RSD/:user', function(req, res, next) {
    var user = req.params.user;
    res.render('RSD', {
        title: 'High School Book Tracking Application - Requirement Specification Document',
        user:user, sid: req.session._id ,users:!!req.session._id,layout:'layout-login'
    });
});

router.get('/RSD/', function(req, res, next) {
    res.render('RSD', {
        title: 'High School Book Tracking Application - Requirement Specification Document',
        layout:'layout-login'
    });
});

/* GET requirement page. */

router.get('/DSD/:user', function(req, res, next) {
    var user = req.params.user;
    res.render('DSD', {
        title: 'High School Book Tracking Application - Requirement Specification Document',
        user:user, sid: req.session._id,users:!!req.session._id ,layout:'layout-login'
    });
});

router.get('/DSD/', function(req, res, next) {
    res.render('DSD', {
        title: 'High School Book Tracking Application - Requirement Specification Document',
        layout:'layout-login'
    });
});



module.exports = router;
