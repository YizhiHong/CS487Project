var express = require('express');
var router = express.Router();

var student = require('../controller/student').student;
var staff = require('../controller/staff').staff;



/**  post student login **/
router.post('/student', function(req, res) {
        var query = {
            Email: req.body.name,
            Password: req.body.password
        };
        console.log(query);
        student.findOne(query, function (err, doc) {
            console.log(doc);
            if (doc) {
                sess = req.session;
                sess._id = doc._id;
                console.log(doc.Email + ": Login success " + new Date());
                res.send({body: doc._id});
            } else {
                console.log(query.Email + ": fail to login " + new Date());
                res.send('Invalid user name or password');
            }
        });
});

/**  get student Center **/
router.get('/student/:id',function (req,res) {
    var id = {_id:req.params.id};
    if(!req.session){
        console.log("please log in first");
        res.redirect("/login");
    }else {
        student.findOne(id, function (err, doc) {
            if (doc) {
                res.render('student-menu', {data: doc, title: 'Student Center',
                    sid:req.session._id, users:true, user:"student" ,layout: 'layout-login'});
            } else {
                res.redirect('/');
            }
        })
    }
});

/**  post staff login **/
router.post('/staff' ,function(req, res) {
        var query = {Email: req.body.name, Password: req.body.password};
        staff.findOne(query, function (err, doc) {
            console.log(doc);
            if (doc) {
                sess = req.session;
                sess._id = doc._id;
                sess.level = doc.Level;
                console.log(doc.Email + ": Login success " + new Date());
                res.send({body: doc._id});
            } else {
                console.log(query.Email + ": fail to login " + new Date());
                res.send('Invalid user name or password');
            }
        });
});

/**  get staff Center **/
router.get('/staff/:id',function (req,res) {
    var id = {_id:req.params.id};
    if(!req.session){
        console.log("please log in first");
        res.redirect("/login");
    }else{
        staff.findOne(id,function (err,doc) {
            if(doc){
                if(doc.Level === 1){
                    res.render('teacher-menu', { data:doc, title: 'Teacher Center',
                        sid:req.session._id, users:true ,user:"staff",layout: 'layout-login'});
                }else if(doc.Level === 0){
                    res.render('staff-menu', { data:doc, title: 'Staff Center',
                        sid:req.session._id, users:true ,user:"staff",layout: 'layout-login'});
                }else{
                    next();
                }
            }else {
                res.redirect('/');
            }
        })
    }
});

/** get All users info **/
router.post('/:id/users' ,function(req, res) {
    var userId = {_id:req.params.id};

    var staffs = staff.findAll();
    var students = student.findAll();
    res.send({
        staffs: staffs,
        students: students
    });
});

/** get users profile **/
router.get('/:user/profile/:id',function (req,res) {
    if(!!req.session._id){
        var id = {_id:req.params.id};
        var user = req.params.user;
        if(user === 'staff'){
            staff.findOne(id,function (err,doc) {
                res.render('profile', { data:doc, title: 'Staff Profile', isStudent:false,
                    sid:req.session._id, users:true ,user:"staff",layout: 'layout-login'});
            })
        }else{
            student.findOne(id,function (err,doc) {
                res.render('profile', { data:doc, title: 'Student Profile', isStudent:true,
                    sid:req.session._id, users:true ,user:"student",layout: 'layout-login'});
            })
        }
    }else{
        console.log("please log in first");
        res.redirect("/login");
    }
});

module.exports = router;
