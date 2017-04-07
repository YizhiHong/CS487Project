var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var requirement = require('./routes/requirement');
var book = require('./routes/book');

var app = express();

/** get Test **/

var mongoose = require('mongoose');

var models = require('./index');
require('express-mongoose');
var DepartmentCollections = models.DepartmentCollection;
var StaffCollection = models.StaffCollection;
var StudentCollections = models.StudentCollection;
var BookCollections = models.BookCollection;
var CourseCollection = models.CourseCollection;

app.get('/users', function(req, res) {
    res.send(StudentCollections.find());
});

/* google api and google book */
// var google = require('googleapis');
// var urlshortener = google.urlshortener('v1');
// var OAuth2 = google.auth.OAuth2;
// var oauth2Client = new OAuth2(
//     "205172263790-a5aha4gajkr71bso44fq08sidr4fiqkd.apps.googleusercontent.com",
//     "xcVrZOx64ZPAyuVJwWj0QyCr",
//     "localhost:8000/"
// );
//
// google.options({
//     auth: oauth2Client
// });



/*
*
*  search initial book
*
* */




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
app.use('/users', users);
app.use('/requirement', requirement);
app.use('/book', book);


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
