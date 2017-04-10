/**
 * Created by Chi.Hong on 4/6/17.
 */
var department = require("../models/department");

var departmentController = function () {};

departmentController.prototype =  {
    //add
    save: function (json, callBack){
        var newDept = new department(json);
        newDept.save(function (err){
            callBack(err);
        });
    },
    //删
    remove: function (json, callBack){
        department.remove(json, function (err){
            callBack(err);
        });
    },
    //改
    update: function (json, condition, callBack){
        department.update(json, condition, function (err){
            callBack(err);
        });
    },
    //查
    find: function (json, callBack){
        department.findOne(json, function (err, doc){
            callBack(err, doc);
        });
    },

    findAll: function () {
        return department.find();
    }
};

exports.department = new departmentController();
