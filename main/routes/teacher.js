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
var teachCourse;

/** GET teacher register Course  **/
router.get('/:id/register', function(req, res, next) {
    if(!!req.session._id){
        // console.log(req.session._id + new Date());
        var sid = req.session._id;
        var id = {_id:req.params.id};

        staff.findOne(id,function (err,doc) {
            if(!err){
                var books = book.findAll();
                departmentID = doc.WorkFor._id;

                res.render('teacher-register', {staff:doc,books:books, title: 'Teacher Register Center',
                    sid:sid, users:!!req.session._id, user:"staff", layout: 'layout-login'});
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
    // console.log(departmentID);
    course.find({Department: departmentID}, function (err,doc) {
        if (!err){
            console.log(doc);
            res.send(doc);
        }else {
            console.log(err);
            res.send("Fail to get Course in your department");
        }
    });
});

router.get('/:id/view-books', function(req, res, next) {
    if(!!req.session._id){
        var sid = req.params.id;
        res.render('teacher-view-books', { title:"Teacher Book Center",
            sid:sid, users:!!req.session._id ,user:"staff", layout: 'layout-login'});
    }else {
        res.redirect('/login');
    }

});

var getStaffBook = function (Courses,callBack){
    var IDList = [];
    course.find({CourseID:Courses},function (err,doc) {
        if(!err){
            for (var i = 0; i < doc.length; i++){
                for(var j = 0 ; j < doc[i].Books.length;j++){
                    IDList.push(doc[i].Books[j]);
                }
            }
            callBack(IDList);
        }else {
            console.log(err);
        }
    });
};

router.post('/:id/book', function(req, res) {
    var id = {_id:req.body.staff};
    staff.findOne(id, function (err,doc) {
        if(!err){
            var bookList;
            if(!!doc.Teach){
                getStaffBook(doc.Teach,function (IDList) {
                    bookList = book.findData({ISBN:IDList});
                    res.send({
                        list:bookList,
                        checked: doc.Books
                    });
                });
            }else{
                bookList = {};
                res.send({
                    list:bookList,
                    checked: false
                });
            }

        }else {
            console.log("Fail to find student" + err);
        }
    })
});



module.exports = router;
