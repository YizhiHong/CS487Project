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

//Export model
module.exports = mongoose.model('student', studentSchema);