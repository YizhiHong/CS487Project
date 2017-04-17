var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
mongoose.Types.ObjectId();

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
                res.redirect('/temp/dept-fail');
            }else{
                console.log("Saved in departments");
                res.redirect('/temp/dept-succeed');
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
    console.log();
    department.find({ DeptID:req.body.departmentCourse},function (err,doc) {
        if(!err){
            deptID = doc._id;
            console.log(doc);
            var courseInfo = {
                CourseName: req.body.CourseName,
                CourseID: req.body.CourseID,
                CourseNumber: req.body.CourseID,
                Department: deptID,
                Books: CourseID,
                Students: []
            };
            console.log(courseInfo);

            (function(){
                course.save(courseInfo,function (err) {
                    if(err){
                        console.log(err);
                        res.redirect('/');
                    }else{
                        if(!!req.body.Teacher){
                            staff.update({_id:req.body.Teacher},{$addToSet:{Teach: courseInfo.CourseID}},function (err) {
                                if(err){
                                    console.log('fail to teach');
                                    res.redirect('/temp/register-fail');
                                }else {
                                    res.redirect('/temp/'+req.body.Teacher);
                                    // res.redirect('/teacher/' + req.body.Teacher +'/register');
                                }
                            })
                        }else {
                            console.log("Saved in courses");
                            res.redirect('/temp/course-succeed');
                        }
                    }
                })
            })(courseInfo);


        }else {
            console.log(err);
            res.redirect('/temp/course-fail');
        }
    });


});

/** add staff information **/
router.post('/add-staff-info', function(req, res) {
    var workfor = req.body.workFor.split(':');

    console.log(req.body.level);
    var staffInfo = {
        SSN: req.body.SSN,
        Email: req.body.email || "iit@hawk.iit.edu",
        Password: req.body.password  || 123,
        LastName: req.body.l_name || "unknown",
        FirstName: req.body.f_name || "unknown",
        Birthday: req.body.birthday || "1989-06-04",
        Level: req.body.level,
        WorkFor: {
            DeptID:workfor[0],
            JobTitle: req.body.JobTitle,
            _id:mongoose.Types.ObjectId(workfor[1]),
            DeptName:workfor[2]
        },
        Teach:[]
    };
    console.log(staffInfo);
    (function(){
        staff.save(staffInfo,function (err) {
            if(err){
                console.log(err);
                res.redirect('/temp/sign-fail');
            }else{
                console.log("Saved in staffs");
                res.redirect('/temp/sign-succeed');
            }
        })
    })(staffInfo);
});

/** add student information **/
router.post('/add-student-info', function(req, res) {
    var CourseID = [];
    console.log(req.body.studentCourse);

    if(!!req.body.studentCourse ){
        if(req.body.studentCourse instanceof Array){
            for (var i=0; i<req.body.studentCourse.length;i++){
                CourseID.push(req.body.studentCourse[i].split(':')[0]);
            }
        }else{
            CourseID.push(req.body.studentCourse.split(':')[0]);
        }
    }

    var studentInfo = {
        Email: req.body.email || "iit@hawk.iit.edu",
        Password: req.body.password  || 123,
        CWID : req.body.CWID || "A00000000",
        LastName: req.body.l_name || "unknown",
        FirstName: req.body.f_name || "unknown",
        Birthday: req.body.birthday || "1989-06-04",
        Courses:[],
        Books:[]
    };

    course.update({CourseID:{$in:CourseID}}, {$addToSet:{Students:studentInfo.CWID}},function (err) {
        if(!err){
            console.log("Saved in Courses");
            course.find( { CourseID : { $in : CourseID } } ,function (err,doc) {
                if(!err){
                    studentInfo.Courses = doc;

                    student.save(studentInfo,function (err) {
                        if(err){
                            console.log(err);
                            res.redirect('/temp/sign-fail');
                        }else{
                            res.redirect('/temp/sign-succeed');
                        }
                    });
                    console.log(studentInfo);
                }else {
                    console.log(err);
                    res.redirect('/temp/sign-fail');
                }
            });
        }else{
            console.log(err);
            res.redirect('/temp/sign-fail');
        }
    });
});

/** modify staff information **/
router.post('/modify-staff-info/:id',function (req,res) {
    staff.update({_id:req.params.id},
        { $set:{FirstName:req.body.f_name,LastName:req.body.l_name,Birthday:req.body.birthday, 'WorkFor.JobTitle' :req.body.JobTitle}},
        function (err) {
            if(!err){
                console.log("update succeed in staff db!");
                res.redirect('/temp/update-succeed');
            }else{
                console.log(err);
                res.redirect('/temp/update-fail');
            }
        })

});

/** modify student information **/
router.post('/modify-student-info/:id',function (req,res) {
    student.update({_id:req.params.id},
        { $set:{FirstName:req.body.f_name,LastName:req.body.l_name,Birthday:req.body.birthday}},
        function (err) {
            if(!err){
                console.log("update succeed in staff db!");
                res.redirect('/temp/update-succeed');
            }else{
                console.log(err);
                res.redirect('/temp/update-fail');
            }
        })
});



module.exports = router;
