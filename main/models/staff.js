/**
 * Created by Chi.Hong on 3/30/17.
 */
var mongoose = require('mongoose');
/* Schema */
var Schema = mongoose.Schema;

/**
 *
 * staff model
 *
 **/

var staffSchema = new Schema({
    SSN: {type:String,required: true,unique:true},
    Email: {type:String,required: true, unique:true},
    Password: {type:String,required: true},
    FirstName: {type:String,max:50,required: true},
    LastName: {type:String,max:50,required: true},
    Birthday : Date,
    Level : {type:Number,require: true, enum: [1, 0], default: 1},
    WorkFor: {type: Schema.ObjectId, ref: 'department',JobTitle: String}
});

module.exports = mongoose.model('staff',staffSchema);