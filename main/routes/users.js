var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var models = require('../index');
var Students = models.StudentCollection;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* login */
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

/* add info */
router.get('/insert-data', function(req, res) {
    res.render('insert-data', { title: 'login' });
});

/* add student information */
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

    // var newStudent = new Students(studentInfo);

    (function(){
        // newStudent.save(function (err) {
        //     if(err){
        //         console.log(err);
        //     }else{
        //         res.redirect('/');
        //     }
        // })
        Students.save(studentInfo,function (err) {
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/');
                }
        })
    })(studentInfo);
});


/* student Center */
router.post('/student-center', function(req, res) {
    var query = {
        LastName: req.body.name,
        Password: req.body.password
    };
    console.log(query);
    (function(){
        Students.count(query, function(err, doc){
            if(doc == 1){
                console.log(query.name + ": Login success " + new Date());
                res.render('student-center', { title:'userCenter' });
            }else{
                console.log(query.name + ": fail to login " + new Date());
                res.redirect('/');
            }
        });
    })(query);
});

/* Staff Center */
router.post('/staff-center', function(req, res) {
    console.log(req.body.name);
    var query = {Name: req.body.name, Password: req.body.password};
    (function(){
        Students.count(query, function(err, doc){
            if(doc == 1){
                console.log(query.name + ": Login success " + new Date());
                res.render('staff-center', { title:'staffCenter' });
            }else{
                console.log(query.name + ": fail to login " + new Date());
                res.redirect('/');
            }
        });
    })(query);
});

module.exports = router;
