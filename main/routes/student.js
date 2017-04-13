/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var filter = require('../sessions/filter');

/** GET student menu **/
router.get('/', filter.authorizeIndex ,function(req, res, next) {
        res.redirect('/login');
});


module.exports = router;
