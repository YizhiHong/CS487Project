var express = require('express');
var router = express.Router();

/* GET requirement page. */

router.get('/', function(req, res, next) {
    res.render('requirement', {
        title: 'High School Book Tracking Application - Requirement Specification Document'
    });
});


module.exports = router;
