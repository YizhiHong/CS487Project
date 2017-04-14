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
    Categories: {type:Array},
    TotalChecked: {type:Number, default: 0, min: 0, max: 1000},
    TotalAvailable: {type:Number, default: 10, min: 0, max: 1000},
    ClassBook : {type: Schema.ObjectId, ref: 'course'},
    CheckOut: {type: Schema.ObjectId, ref: 'student'},
    image: String
});

var books = mongoose.model('book',bookSchema);

module.exports = books;