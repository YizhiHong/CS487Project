/**
 * Created by Chi.Hong on 2/15/17.
 *
 *  Connect to Database
 *
 * */

var mongoose = require("mongoose");

/** require increment plugin **/
var autoIncrement = require('mongoose-auto-increment');

/** connect to local database **/
var connection = mongoose.connect('mongodb://localhost/bookTrackingApp');

/** generate ID automatically **/
autoIncrement.initialize(connection);

/* Schema */
var Schema = mongoose.Schema;

/**
 *
 *
 * develop a new Schema
 * 1. students
 * 2. staff
 * 3. class
 * 4. department
 * 5. book
 *
 *
 * **/

var studentSchema = new Schema({
    Email: String,
    Password: String,
    Name: String,
    BirthDate : String,
    StudentID : Number
})



/* export models  */
exports.StudentCollection = mongoose.model('students', studentSchema);

// add new data
// var oneStudent = new students({
//     Email: "admin@admin.com",
//     Password: "123",
//     Name: "admin",
//     BirthDate : "0000-00-00",
//     StudentID : 00000,
// })
// //保存数据库
// oneStudent.save(function(err) {
//     if (err) {
//         console.log('fail')
//         return;
//     }
//     console.log('saved');
// });
