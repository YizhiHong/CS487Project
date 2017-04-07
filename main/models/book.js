/**
 * Created by Chi.Hong on 4/1/17.
 */
var mongoose = require('mongoose');
/* Schema */
var Schema = mongoose.Schema;

/**
 *
 * book model
 *
 **/

var bookSchema = new Schema({
    BookID: {type:String,required: true,unique:true},
    ISBN: {type:String,required: true, unique:true},
    Title: {type:String,required: true},
    Authors: {type:Array,required: true},
    Publisher: String,
    PublishedDate : Date,
    Description: String,
    Categories: {type:Array,required: true},
    TotalChecked: {type:Number, default: 0},
    TotalAvailable: {type:Number, default: 10},
    ClassBook : {type: Schema.ObjectId, ref: 'course'},
    CheckOut: {type: Schema.ObjectId, ref: 'student'},
    image: String
});

module.exports = mongoose.model('book',bookSchema);