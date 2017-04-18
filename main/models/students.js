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
        Birthday : String,
        Courses: {type: Object, ref: 'course'},
        Books: {type: Object, ref: 'book',
            CheckOutDate: {type: Date},
            DueDate: {type: Date}
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

//Export model
module.exports = student;
