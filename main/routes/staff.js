/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var filter = require('../sessions/filter');
var book = require('../controller/book').book;

/** GET staff Book**/
router.get('/:id/book', function(req, res, next) {
    if(!!req.session._id){
        console.log(req.session._id + new Date());
        var sid = req.session._id;
        res.render('staff-book-list', { title: 'Modify book information',
            sid:sid,  users:!!req.session._id, user:"staff",layout: 'layout-login'});
    }else{
        res.redirect('/login');
    }
});

router.get('/:id/level', function(req, res, next) {
    if(!!req.session._id){
        console.log(req.session._id + new Date());
        var sid = req.session._id;
        res.render('staff-access-level', { title: 'All Users List',
            sid:sid, users:!!req.session._id, user:"staff", layout: 'layout-login'});
    }else{
        res.redirect('/login');
    }
});

module.exports = router;
