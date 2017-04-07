/**
 * Created by Chi.Hong on 4/6/17.
 */
var express = require('express');
var router = express.Router();

var books = require('google-books-search');

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

/* get book */
router.post('/book-list',function (req,res,next){
    var searchContent = req.body.search;
    console.log(searchContent);
    books.search(searchContent, options,function(error, results) {
        if (!error) {
            console.log(results);
            console.log(results[0].industryIdentifiers);
            googleBookList = JSON.stringify(results);
            res.setHeader('Content-Type', 'application/json');
            res.send(googleBookList);
        } else {
            console.log(error);
        }
    });

});


module.exports = router;
