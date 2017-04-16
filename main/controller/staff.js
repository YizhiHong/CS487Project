/**
 * Created by Chi.Hong on 4/6/17.
 */
var staff = require("../models/staff");

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
        staff.update(json, {$addToSet:
            {Books:[{ISBN:isbn, CheckOutDate:new Date(), DueDate: '2018-09-01'}]}
        },function (err){
            callBack(err);
        });
    }
};

exports.staff = new staffController();
