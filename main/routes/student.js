/**
 * Created by Chi.Hong on 4/9/17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var filter = require('../sessions/filter');

/** GET student menu **/
router.get('/:id/book', filter.authorizeIndex ,function(req, res, next) {
    var id = {_id:req.params.id};
    console.log(id);
});


module.exports = router;
