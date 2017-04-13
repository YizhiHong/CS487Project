/**
 * Created by Chi.Hong on 4/6/17.
 */
var student = require("../models/students");

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
    //查
    find: function (json, callBack){
        student.findOne(json, function (err, doc){
            callBack(err, doc);
        });
    },
    findAll: function () {
        return student.find();
    },
    isLogined: function (req) {
        return !!req.session._id
    }
};

exports.student = new studentController();
