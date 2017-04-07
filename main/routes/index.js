var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'High school book Tracking application'
        , layout: 'layout-login'
    });
});


module.exports = router;
