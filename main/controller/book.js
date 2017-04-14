/**
 * Created by Chi.Hong on 4/6/17.
 */
var book = require("../models/book");

var bookController = function () {};

bookController.prototype =  {
    //add
    save: function (json, callBack){
        var newBook = new book(json);
        newBook.save(function (err){
            callBack(err);
        });
    },
    //删
    remove: function (json, callBack){
        book.remove(json, function (err){
            callBack(err);
        });
    },
    //改
    update: function (json, condition, callBack){
        book.update(json, condition, function (err){
            callBack(err);
        });
    },
    //查
    find: function (json, callBack){
        book.find(json, function (err, doc){
            callBack(err, doc);
        });
    },
    findData: function (json, callBack){
       return book.find(json);
    },
    findOne: function (json, callBack){
        book.findOne(json, function (err, doc){
            callBack(err, doc);
        });
    },
    //find all
    findAll: function (){
        return book.find();
    }
};

exports.book = new bookController();
