/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

/** GET teacher menu  **/
router.get('/', function(req, res, next) {
    res.render('teacher-menu', { title: 'teacher menu' , layout: 'layout-login'});
});

router.get('/view-books', function(req, res, next) {
    res.render('teacher-view-books', { title: 'teacher view books' , layout: 'layout-login'});
});

router.get('/register', function(req, res, next) {
    res.render('teacher-register', { title: 'teacher register' , layout: 'layout-login'});
});

module.exports = router;
