var express = require('express');
var router = express.Router();

var student = require('../controller/student').student;
var staff = require('../controller/staff').staff;
var sess = require('../app').sess;

/**  student Center **/
router.post('/student', function(req, res) {
        var query = {
            Email: req.body.name,
            Password: req.body.password
        };
        console.log(query);
        student.find(query, function (err, doc) {
            console.log(doc);
            if (doc) {
                sess = req.session;
                sess._id = doc._id;
                console.log(sess._id);
                console.log(doc.Email + ": Login success " + new Date());
                res.send({body: doc._id});
            } else {
                console.log(query.Email + ": fail to login " + new Date());
                res.send('Invalid user name or password');
            }
        });
});

router.get('/student/:id',function (req,res) {
    var id = {_id:req.params.id};
    if(!sess){
        console.log("please log in first");
        res.redirect("/login");
    }else {
        student.find(id, function (err, doc) {
            if (doc) {
                res.render('student-menu', {data: doc , users:!!sess._id , layout: 'layout-login'});
            } else {
                res.redirect('/');
            }
        })
    }
});
//
// router.get('/student/:id',function (req,res) {
//
//
// });

/**  Staff Center **/
router.post('/staff' ,function(req, res) {
        var query = {Email: req.body.name, Password: req.body.password};
        staff.find(query, function (err, doc) {
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

router.get('/staff/:id',function (req,res) {
    var id = {_id:req.params.id};
    if(!sess){
        console.log("please log in first");
        res.redirect("/login");
    }else{
        staff.find(id,function (err,doc) {
            if(doc){
                if(doc.Level === 1){
                    res.render('teacher-menu', { data:doc, users:!!sess._id ,layout: 'layout-login'});
                }else if(doc.Level === 0){
                    res.render('staff-menu', { data:doc, users:!!sess._id ,layout: 'layout-login'});
                }else{
                    next();
                }
            }else {
                res.redirect('/');
            }
        })
    }

});

module.exports = router;
