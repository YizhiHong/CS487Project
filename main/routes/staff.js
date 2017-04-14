/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var filter = require('../sessions/filter');
var book = require('../controller/book').book;

/** GET staff menu **/
router.get('/:id/book', function(req, res, next) {
    if(!!req.session._id){
        console.log(req.session._id + new Date());
        var sid = req.session._id;
        res.render('staff-book-list', { sid:sid, title: 'Modify book information', users:!!req.session._id, layout: 'layout-login'});
    }else{
        res.redirect('/login');
    }
});

router.get('/:id/level', function(req, res, next) {
    if(!!req.session._id){
        console.log(req.session._id + new Date());
        var sid = req.session._id;
        res.render('user-access-level', { sid:sid, title: 'All Users List', users:!!req.session._id, layout: 'layout-login'});
    }else{
        res.redirect('/login');
    }
});

module.exports = router;
