/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

/** GET student menu **/
router.get('/', function(req, res, next) {
    res.render('student-menu', { title: 'student menu' , layout: 'layout-login'});
});


module.exports = router;
