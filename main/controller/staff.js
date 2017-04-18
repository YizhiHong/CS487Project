/**
 * Created by Chi.Hong on 4/6/17.
 */
var staff = require("../models/staff");
var moment = require('moment');

var staffController = function () {};

staffController.prototype =  {
    //save a set
    save: function (json, callBack){
        var newStaff = new staff(json);
        newStaff.save(function (err){
            callBack(err);
        });
    },
    //delete
    remove: function (json, callBack){
        staff.remove(json, function (err){
            callBack(err);
        });
    },
    //update
    update: function (json, condition, callBack){
        staff.update(json, condition,{ upsert: true }, function (err){
            callBack(err);
        });
    },
    //Find one
    findOne: function (json, callBack){
        staff.findOne(json, function (err, doc){
            callBack(err, doc);
        });
    },
    //Find Many
    find: function (json, callBack){
        staff.find(json, function (err, doc){
            callBack(err, doc);
        });
    },
    findAll: function (){
       return staff.find();
    },
    checkOutBook: function (json,isbn,callBack) {
        var d = moment(new Date()).subtract('5','hour');
        var m = new Date(moment(d).add(12,'month').toString());
        staff.update(json, {$addToSet:
            {Books:[{ISBN:isbn, CheckOutDate:  new Date(d) , DueDate: m}]}
        },function (err){
            callBack(err);
        });
    }
};

exports.staff = new staffController();
