/**
 * Created by Chi.Hong on 4/6/17.
 */
var course = require("../models/course");

var courseController = function () {};

courseController.prototype =  {
    //add
    save: function (json, callBack){
        var newCourse = new course(json);
        newCourse.save(function (err){
            callBack(err);
        });
    },
    //delete
    remove: function (json, callBack){
        course.remove(json, function (err){
            callBack(err);
        });
    },
    //update
    update: function (json, condition, callBack ){
        course.update(json, condition, { multi: true }, function (err){
            callBack(err);
        });
    },
    //insert
    insert: function (json, callBack) {
      course.insert(json, function (err,doc) {
          callBack(err,doc);
      })
    },
    //find one
    findOne: function (json, callBack){
        course.findOne(json, function (err, doc){
            callBack(err, doc);
        });
    },
    //find more
    find: function (json, callBack){
        course.find(json, function (err, doc){
            callBack(err, doc);
        });
    },
    //find all
    findAll: function (){
        return course.find();
    }
};

exports.course = new courseController();
