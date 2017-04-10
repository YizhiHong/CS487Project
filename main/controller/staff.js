/**
 * Created by Chi.Hong on 4/6/17.
 */
var staff = require("../models/staff");

var staffController = function () {};

staffController.prototype =  {
    //add
    save: function (json, callBack){
        var newStaff = new staff(json);
        newStaff.save(function (err){
            callBack(err);
        });
    },
    //删
    remove: function (json, callBack){
        staff.remove(json, function (err){
            callBack(err);
        });
    },
    //改
    update: function (json, condition, callBack){
        staff.update(json, condition, function (err){
            callBack(err);
        });
    },
    //查
    find: function (json, callBack){
        staff.findOne(json, function (err, doc){
            callBack(err, doc);
        });
    },
    findAll: function (){
       return staff.find();
    }
};

exports.staff = new staffController();
