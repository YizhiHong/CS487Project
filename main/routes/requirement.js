var express = require('express');
var router = express.Router();

/* GET requirement page. */

router.get('/RSD', function(req, res, next) {
    res.render('requirement', {
        title: 'High School Book Tracking Application - Requirement Specification Document'
    });
});


/* GET requirement page. */

router.get('/DSD', function(req, res, next) {
    res.render('DSD', {
        title: 'High School Book Tracking Application - Requirement Specification Document'
    });
});


module.exports = router;
