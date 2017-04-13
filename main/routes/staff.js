/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var filter = require('../sessions/filter');

/** GET staff menu **/
router.get('/',filter.authorizeIndex, function(req, res, next) {
    res.redirect('/login');
});

/** GET staff menu **/
router.get('/:id/book', function(req, res, next) {
    res.render('book-list', { title: 'access level' , layout: 'layout-login'});
});

router.get('/:id/level', function(req, res, next) {
    res.render('user-access-level', { title: 'access level' , layout: 'layout-login'});
});


module.exports = router;
