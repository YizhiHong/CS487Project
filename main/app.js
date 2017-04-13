var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/** initialize view template **/

var index = require('./routes/index');
var requirement = require('./routes/requirement');
var book = require('./routes/book');
var staff = require('./routes/staff');
var teacher = require('./routes/teacher');
var student = require('./routes/student');

var admin = require('./routes/admin');

var app = express();

/** get DB tables **/

var mongoose = require('mongoose');
var models = require('./index');
require('express-mongoose');
var DepartmentCollections = models.DepartmentCollection;
var StaffCollection = models.StaffCollection;
var StudentCollections = models.StudentCollection;
var BookCollections = models.BookCollection;
var CourseCollection = models.CourseCollection;

/** session check **/
var session = require('express-session');
// var FileStore = require('session-file-store')(session);
// var identityKey = 'hong';

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
var filter = require('./sessions/filter');
var sess;
/** home page. **/
app.get('/',filter.authorizeIndex, function(req, res, next) {
    res.render('index', {
        title: 'High school book Tracking application'
        , layout: 'layout-login'
    });
});


/** login **/
app.get('/login', filter.authorize, function(req, res) {
    res.render('login', {title: 'login', layout: 'layout-login'});
});

app.get('/log-out', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            res.json({msg: 'Fail to log out'});
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/sign-up', filter.authorize, function(req, res) {
    res.render('sign-up', {title: 'sign up', layout: 'layout-login'});
});


//
// app.get('/users', function(req, res) {
//     res.send(StudentCollections.find());
// });
//
// app.get('/books', function(req, res) {
//     res.send(BookCollections.find());
// });




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/requirement', requirement);
app.use('/book', book);
app.use('/staff', staff);
app.use('/teacher', teacher);
app.use('/student', student);

//only for admin
app.use('/admin', admin);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
