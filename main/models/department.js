/**
 * Created by Chi.Hong on 3/30/17.
 */
var mongoose = require('mongoose');
/* Schema */
var Schema = mongoose.Schema;

/**
 *
 * department model
 *
 **/

var deptSchema = new Schema({
    DeptID:  {type:String,required: true, unique:true},
    DeptName:  {type:String,required: true, unique:true},
    Location: String
});


module.exports = mongoose.model('department', deptSchema);


