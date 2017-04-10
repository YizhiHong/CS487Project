var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var db = require('../index').db;

/** get all controller**/

var department = require('../controller/department').department;
var course = require('../controller/course').course;
var student = require('../controller/student').student;
var staff = require('../controller/staff').staff;
var book = require('../controller/book').book;


/** add info **/
router.get('/', function(req, res) {
    var dept = department.findAll();
    var classBook = book.findAll();
    var courses = course.findAll();
    var students = student.findAll();
    var staffs = staff.findAll();
    res.render('admin', { title: 'admin',staffs: staffs, departments : dept, books : classBook ,courses:courses ,students:students,layout: 'layout-login' });
});

/** add department information **/
router.post('/add-department-info', function(req, res) {
    var departmentInfo = {
        DeptID: req.body.DeptID,
        DeptName: req.body.DeptName,
        Location : req.body.Location|| "3300 S Federal St, Chicago, IL 60616"
    };
    console.log(departmentInfo);

    (function(){
        department.save(departmentInfo,function (err) {
            if(err){
                console.log(err);
                res.redirect('/');
            }else{
                console.log("Saved in departments");
                res.redirect('/admin');
            }
        })
    })(departmentInfo);
});

/** add course information **/
router.post('/add-course-info', function(req, res) {
    var deptID;
    var CourseID = [];
    if(req.body.ClassBook instanceof Array){
        for (var i=0; i<req.body.ClassBook.length;i++){
            CourseID.push(req.body.ClassBook[i].split(':')[0]);
        }
    }else{
        CourseID.push(req.body.ClassBook.split(':')[0]);
    }

    department.find({ DeptID:req.body.departmentCourse},function (err,doc) {
        if(!err){
            deptID = doc._id;
            console.log(doc);
            var courseInfo = {
                CourseName: req.body.CourseName,
                CourseID: req.body.CourseID,
                CourseNumber: req.body.CourseID,
                Department: deptID,
                Books: CourseID
            };
            console.log(courseInfo);

            (function(){
                course.save(courseInfo,function (err) {
                    if(err){
                        console.log(err);
                        res.redirect('/');
                    }else{
                        console.log("Saved in courses");
                        res.redirect('/admin');
                    }
                })
            })(courseInfo);
        }else {
            console.log(err);
            res.redirect('/');
        }
    });


});

/** add staff information **/
router.post('/add-staff-info', function(req, res) {
    var staffInfo = {
        SSN: req.body.SSN,
        Email: req.body.email || "iit@hawk.iit.edu",
        Password: req.body.password  || 123,
        LastName: req.body.l_name || "unknown",
        FirstName: req.body.f_name || "unknown",
        Brithday: req.body.birthday || "1989-06-04",
        Level: req.body.level || 1,
        WorkFor: {
            DeptID:req.body.workFor,
            JobTitle: req.body.JobTitle
        }
    };
    console.log(staffInfo);
    (function(){
        staff.save(staffInfo,function (err) {
            if(err){
                console.log(err);
                res.redirect('/');
            }else{
                console.log("Saved in staffs");
                res.redirect('/admin');
            }
        })
    })(staffInfo);
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
                res.redirect('/');
            }else{
                console.log("Saved in students");
                res.redirect('/admin');
            }
        })
    })(studentInfo);
});



module.exports = router;