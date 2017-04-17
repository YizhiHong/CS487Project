/**
 * Created by Chi.Hong on 4/6/17.
 */
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var mongoose = require("mongoose");
// create application/json parser
router.use(bodyParser.json());

var books = require('google-books-search');
var book = require('../controller/book').book;
var student = require('../controller/student').student;
var staff = require('../controller/staff').staff;


/* book option */
var options = {
    limit: 20,
    type: 'books',
    order: 'relevance',
    lang: 'en'
};

router.get('/', function(req, res, next) {
    res.render('book-list', {
        layout: 'layout-login'
    });
});

/** get book **/
router.post('/book-list',function (req,res,next){
    var searchContent = req.body.search;
    console.log(searchContent);
    books.search(searchContent, options,function(error, results) {
        if (!error) {
            results = translate(results);
            console.log(results);
            googleBookList = JSON.stringify(results);
            res.setHeader('Content-Type', 'application/json');
            res.send(googleBookList);
        } else {
            console.log(error);
        }
    });
});

//book format translation
var translate = function(data) {
    var output=[];
    for(var i in data){
        if(!!data[i].industryIdentifiers){
            console.log(data[i].industryIdentifiers);
            output.push( {
                "BookID": data[i].industryIdentifiers[0].identifier,
                "ISBN": data[i].industryIdentifiers[0].identifier,
                "Title": data[i].title,
                "Authors": data[i].authors,
                "Publisher": data[i].publisher,
                "PublishedDate" : data[i].publishedDate,
                "Description":  data[i].description,
                "Categories": data[i].categories,
                "TotalChecked": 0,
                "TotalAvailable": 10,
                "image": data[i].thumbnail
            })
        }

    }
    return output;
}

/** book list save **/
router.post('/book-list-save',function (req,res,next){
    if(!req.body || req.body.length === 0) {
        console.log('request body not found');
        return res.sendStatus(400);
    }
    var bookList = req.body;
    console.log(bookList);
    var _result;

    (function(){
        for(var i in bookList){
            book.save(bookList[i],function (err) {
                if(err){
                    console.log("error with"+err);
                }else{
                    console.log("saved");
                }

            })
        }
        res.setHeader('Content-Type', 'application/json');
        _result={
            msg: count == 0 ? "all saved": "some of then fail to save!! And totally !!! "
        };
        res.json(_result);

    })(bookList);
});

/** single book save **/
router.post('/book-single-save',function (req,res,next){
    if(!req.body || req.body.length === 0) {
        console.log('request body not found');
        return res.sendStatus(400);
    }

    var aBook = req.body;
    console.log(aBook);
    var _result;

    (function(){
        book.save(aBook,function (err) {
            if(err){
                console.log("error with"+err);
                _result={
                    msg:"Already exist in database!!!"
                };
            }else{
                console.log("saved");
                _result={
                    msg:"succeed!!!"
                };
            }
            res.json(_result);
        })

    })(aBook);
});

/** student check book **/
router.post('/:id/check-out-book',function (req,res,next){
    var studentID = {_id:req.params.id};
    var bookID = {ISBN:req.body.ISBN};
    book.update(bookID,{$inc:{ TotalChecked:+1,TotalAvailable:-1} },function (err) {
        if(!err){
            console.log("saved in book db");
            student.checkOutBook(studentID,bookID.ISBN,function (err,d,m) {
                if(!err){
                    console.log("saved in student db");
                    res.send({CheckOutDate:d,DueDate:m});
                }else{
                    console.log(err);
                    res.send(false);
                }
            })
        }else{
            console.log("error with"+err);
            res.send(false);
        }

    })
});

/** staff check book **/
router.post('/:id/staff-check-out-book',function (req,res,next){
    var staffID = {_id:req.params.id};
    var bookID = {ISBN:req.body.ISBN};
    book.update(bookID,{$inc:{ TotalChecked:+1,TotalAvailable:-1} },function (err) {
        if(!err){
            console.log("saved in book db");
            staff.checkOutBook(staffID,bookID.ISBN,function (err) {
                if(!err){
                    console.log("saved in staff db");
                    res.send(true);
                }else{
                    console.log(err);
                    res.send(false);
                }
            })
        }else{
            console.log("error with"+err);
            res.send(false);
        }

    })
});

/** get All book **/
router.post('/:id/Allbook', function(req, res, next) {
    var sid = req.session._id;
    var allBooks =  book.findAll();
    res.send(allBooks);
});

router.post('/:id/update-book', function(req, res, next) {
    var data = req.body;
    var ISBN = {ISBN:data.ISBN};
    var tc = data.TotalChecked;
    var ta = data.TotalAvailable;
    book.update(ISBN,{TotalChecked:tc,TotalAvailable:ta},function (err) {
        if(!err){
            console.log("saved in book db");
            res.send({
                msg: "Update succeed!!!"
            });
        }else{
            console.log("error with"+err);
            res.send({
                msg: "Fail to Update!!!"
            });
        }

    })
});

module.exports = router;
