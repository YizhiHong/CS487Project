/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var filter = require('../sessions/filter');
var staff = require('../controller/staff').staff;
var book = require('../controller/book').book;
var course = require('../controller/course').course;

var departmentID;


/** GET teacher register Course  **/
router.get('/:id/register', function(req, res, next) {
    if(!!req.session._id){
        console.log(req.session._id + new Date());
        var sid = req.session._id;
        var id = {_id:req.params.id};

        staff.findOne(id,function (err,doc) {
            if(!err){
                var books = book.findAll();
                departmentID = doc.WorkFor._id;
                res.render('teacher-register', {staff:doc,books:books,sid:sid, title: 'Register Course', users:!!req.session._id, layout: 'layout-login'});
            }else{
                console.log(err);
                res.render("Teacher Not Found!!");
            }
        });
    }else{
        res.redirect('/login');
    }
});

router.post('/:id/register', function(req, res, next) {
    var StaffID = {_id:req.params.id};
    var CourseID = req.body.Course;
    staff.update(StaffID,{$addToSet:{Teach:CourseID}}, function (err) {
        if (!err){
            res.send(true);
        }else {
            console.log(err);
            res.send(false);
        }
    });
});

router.post('/:id/get-course', function(req, res, next) {
    console.log(departmentID);
    course.find({Department: departmentID}, function (err,doc) {
        if (!err){
            // console.log(doc);
            res.send(doc);
        }else {
            console.log(err);
            res.send("Fail to get Course in your department");
        }
    });
});

router.get('/view-books', function(req, res, next) {
    res.render('teacher-view-books', { title: 'teacher view books' , layout: 'layout-login'});
});
//
// router.get('/register', function(req, res, next) {
//     res.render('teacher-register', { title: 'teacher register' , layout: 'layout-login'});
// });

module.exports = router;
