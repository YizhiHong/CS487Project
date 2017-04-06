/**
 * Created by Chi.Hong on 3/30/17.
 */
var mongoose = require('mongoose');
/* Schema */
var Schema = mongoose.Schema;

/**
*
* students model
*
**/

var studentSchema = Schema(
    {
        CWID: {type:String,required: true, length: 9,unique:true},
        Email: {type:String,required: true, unique:true},
        Password: {type:String,required: true},
        FirstName: {type:String,max:50,required: true},
        LastName: {type:String,max:50,required: true},
        Birthday : Date,
        Courses: {type: Schema.ObjectId, ref: 'course'},
        Books: {type: Schema.ObjectId, ref: 'book',
            CheckOutDate: {type: Date, default: Date.now},
            DueDate: {type: Date, default: '2017-06-01'}
        }
    }
);

studentSchema.virtual('name').get(function () {
    return this.LastName + ', ' + this.FirstName;
});
studentSchema.virtual('url').get(function () {
    return '/student/' + this._id;
});

var student = mongoose.model('student', studentSchema);
//
// var studentController = function (){};
//
//
// studentController.prototype = {
//     //增
//     save: function (json, callBack){
//         var newUser = new student(json);
//
//         newUser.save(function (err){
//             callBack(err);
//         });
//     },
//     //删
//     remove: function (json, callBack){
//         student.remove(json, function (err){
//             callBack(err);
//         });
//     },
//     //改
//     update: function (json, condition, callBack){
//         student.update(json, condition, function (err){
//             callBack(err);
//         });
//     },
//     //查
//     findByName: function (name, callBack){
//         student.findOne({username: name}, function (err, doc){
//             callBack(err, doc);
//         });
//     }
// };

var students = function () {
    this.model = student;
    this.save = function (json, callBack){
        var newUser = new model(json);

        newUser.save(function (err){
            callBack(err);
        });
    },
    this.remove = function (json, callBack){
        student.remove(json, function (err){
            callBack(err);
        });
    },
    this.update = function (json, condition, callBack){
        student.update(json, condition, function (err){
            callBack(err);
        });
    },
    this.findByName = function (name, callBack){
        student.findOne({username: name}, function (err, doc){
            callBack(err, doc);
        });
    }
};

//Export model
module.exports = student;
