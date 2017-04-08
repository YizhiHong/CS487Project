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

/* book option */
var options = {
    limit: 5,
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
            // console.log(results);
            // console.log(results[0].industryIdentifiers);
            googleBookList = JSON.stringify(results);
            res.setHeader('Content-Type', 'application/json');
            res.send(googleBookList);
        } else {
            console.log(error);
        }
    });
});

/** book save **/
router.post('/book-list-save',function (req,res,next){
    if(!req.body || req.body.length === 0) {
        console.log('request body not found');
        return res.sendStatus(400);
    }
    var bookList = req.body;
    // console.log(bookList);

    (function(){
        for(var i in bookList){
            book.save(bookList[i],function (err) {
                if(err){
                    console.log("error with"+err);
                    // res.send("fail to save in database!!!");
                }else{
                    console.log("saved");
                    // res.send("saved in database!!!");
                }
            })
        }

            res.setHeader('Content-Type', 'application/string');
            res.send("done");


    })(bookList);
});

module.exports = router;
