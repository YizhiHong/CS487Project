/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());

var mongoose = require("mongoose");
var filter = require('../sessions/filter');
var student = require('../controller/student').student;
var book = require('../controller/book').book;

/** GET student menu **/
router.get('/:id/book' ,function(req, res, next) {
    if(!!req.session._id){
        console.log(req.params.id);
        var sid = req.params.id;
        res.render('student-book-check', { title:"Student Book Center",
            sid: sid,users: !!req.session._id , user:"student", layout: 'layout-login'});
    }else{
        res.redirect('/login');
    }
});

var getStudentsBook = function (Courses) {
    var books = [];
    for(var i = 0; i < Courses.length; i++){
        for(var j = 0; j < Courses[i].Books.length; j++){
            books.push(Courses[i].Books[j]);
        }
    }
    var bookCollection = book.findData({ISBN:books});
    return bookCollection;
};

router.post('/:id/book', function(req, res) {
    var id = {_id:req.body.books};
    student.findOne(id, function (err,doc) {
        if(!err){
            var bookList = getStudentsBook(doc.Courses);
            if(!!doc.Books){
                res.send({
                    list:bookList,
                    checked: doc.Books
                });
            }else{
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
