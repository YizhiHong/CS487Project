/**
 * Created by Chi.Hong on 3/30/17.
 */
var mongoose = require('mongoose');
/* Schema */
var Schema = mongoose.Schema;

/**
 *
 * course model
 *
 **/

var courseSchema = new Schema({
    CourseID:  {type:String,required: true,unique:true},
    CourseName: String,
    CourseNumber:  {type:String,required: true,unique:true},
    Department: {type: Schema.ObjectId, ref: 'department'},
    Teachers: {type: Schema.ObjectId, ref: 'staff'},
    Books: {type: Schema.ObjectId, ref: 'book'},
    Students: {type: Schema.ObjectId, ref: 'student'}
});

module.exports = mongoose.model('course',courseSchema);