var express = require('express');
var router = express.Router();

/** home page. **/

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'High school book Tracking application'
        , layout: 'layout-login'
    });
});

/** login **/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login', layout: 'layout-login' });
});

/**  student Center **/
router.post('/student', function(req, res) {
    var query = {
        Email: req.body.name,
        Password: req.body.password
    };

    (function(){
        student.find(query, function(err, doc){
            console.log(doc);
            if(doc){
                console.log(query.name + ": Login success " + new Date());
                res.render('student', { title:'Student Center' });
            }else{
                console.log(query.name + ": fail to login " + new Date());
                res.send('password wrong');
            }
        });
    })(query);
});

/**  Staff Center **/
router.post('/staff', function(req, res) {
    var query = {Name: req.body.name, Password: req.body.password};
    student.find(query, function(err, doc){
        console.log(doc);
        if(doc){
            console.log(query.name + ": Login success " + new Date());
            res.render('staff', { title:'userCenter' });
        }else{
            console.log(query.name + ": fail to login " + new Date());
            res.send('password wrong');
        }
    });
});

module.exports = router;
