var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

/** get student controller**/
var student = require('../controller/student').student;

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'High school book Tracking application'
        , layout: 'layout-login'
    });
});

/** login **/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login', layout: 'layout-login' });
});

/** add info **/
router.get('/insert-data', function(req, res) {
    res.render('insert-data', { title: 'login' });
});

/** add student information **/
router.post('/add-student-info', function(req, res) {
    var studentInfo = {
        Email: req.body.email || "iit@hawk.iit.edu",
        Password: req.body.password  || 123,
        CWID : req.body.CWID || "A00000000",
        LastName: req.body.l_name || "unknown",
        FirstName: req.body.f_name || "unknown",
        Brithday: req.body.birthday || "1989-06-04"
    };
    console.log(studentInfo);

    (function(){
        student.save(studentInfo,function (err) {
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    })(studentInfo);
});


/**  student Center **/
router.post('/student', function(req, res) {
    var query = {
        Email: req.body.name,
        Password: req.body.password
    };

    (function(){
        student.find(query, function(err, doc){
            console.log(doc);
            if(doc){
                console.log(query.name + ": Login success " + new Date());
                res.render('student', { title:'Student Center' });
            }else{
                console.log(query.name + ": fail to login " + new Date());
                res.send('password wrong');
            }
        });
    })(query);
});

/**  Staff Center **/
router.post('/staff', function(req, res) {
    var query = {Name: req.body.name, Password: req.body.password};
    student.find(query, function(err, doc){
        console.log(doc);
        if(doc){
            console.log(query.name + ": Login success " + new Date());
            res.render('staff', { title:'userCenter' });
        }else{
            console.log(query.name + ": fail to login " + new Date());
            res.send('password wrong');
        }
    });
});

module.exports = router;
