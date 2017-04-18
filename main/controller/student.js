/**
 * Created by Chi.Hong on 4/6/17.
 */
var student = require("../models/students");
var moment = require('moment');

var studentController = function () {};

studentController.prototype =  {
    //add
    save: function (json, callBack){
        var newUser = new student(json);
        newUser.save(function (err){
            callBack(err);
        });
    },
    //删
    remove: function (json, callBack){
        student.remove(json, function (err){
            callBack(err);
        });
    },
    //改
    update: function (json, condition, callBack){
        student.update(json, condition, function (err){
            callBack(err);
        });
    },
    //find one
    findOne: function (json, callBack){
        student.findOne(json, function (err, doc){
            callBack(err, doc);
        });
    },
    //find more
    find: function (json, callBack){
        student.find(json, function (err, doc){
            callBack(err, doc);
        });
    },
    //
    findAll: function () {
        return student.find();
    },
    isLogined: function (req) {
        return !!req.session._id
    },
    checkOutBook: function (json,isbn,callBack) {
        var d = moment(new Date()).subtract('5','hour');
        var m = new Date(moment(d).add(3,'month').toString());
        student.update(json, {$addToSet:
            {Books:[{ISBN:isbn, CheckOutDate:   new Date(d)  , DueDate: m}]}
        },function (err){
            callBack(err,d,m);
        });
    }
};

exports.student = new studentController();
