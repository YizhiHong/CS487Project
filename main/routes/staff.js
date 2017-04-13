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

router.get('/level', function(req, res, next) {
    res.render('user-access-level', { title: 'access level' , layout: 'layout-login'});
});

module.exports = router;
