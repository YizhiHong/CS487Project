var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var models = require('../model');
var StudentCollections = models.StudentCollection;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* login */
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

/* student Center */
router.post('/student-center', function(req, res) {
    console.log(req.body.name);
    var query = {Name: req.body.name, Password: req.body.password};
    (function(){
        StudentCollections.count(query, function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
            if(doc == 1){
                console.log(query.name + ": 登陆成功 " + new Date());
                res.render('student-center', { title:'userCenter' });
            }else{
                console.log(query.name + ": 登陆失败 " + new Date());
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
        StudentCollections.count(query, function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
            if(doc == 1){
                console.log(query.name + ": 登陆成功 " + new Date());
                res.render('staff-center', { title:'staffCenter' });
            }else{
                console.log(query.name + ": 登陆失败 " + new Date());
                res.redirect('/');
            }
        });
    })(query);
});

module.exports = router;
