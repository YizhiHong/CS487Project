/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var filter = require('../sessions/filter');


/** GET teacher menu  **/
router.get('/',filter.authorizeIndex, function(req, res, next) {
    res.redirect('/login');
});

router.get('/view-books', function(req, res, next) {
    res.render('teacher-view-books', { title: 'teacher view books' , layout: 'layout-login'});
});

router.get('/register', function(req, res, next) {
    res.render('teacher-register', { title: 'teacher register' , layout: 'layout-login'});
});

module.exports = router;
