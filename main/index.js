/**
 * Created by Chi.Hong on 2/15/17.
 *
 *  Connect to Database
 *
 * */

var mongoose = require("mongoose");

/** require increment plugin **/
var autoIncrement = require('mongoose-auto-increment');

/** connect to local database **/
var config = require('./config/config');
var connection = mongoose.connect(config.mongodb);

/** generate ID automatically **/
autoIncrement.initialize(connection);

/** require the object **/
var departments = require("./models/department");
var staffs = require("./models/staff");
var students = require("./models/students");
var books = require("./models/book");
var courses = require("./models/course");

/**
 *  Department Instantiation
 *
 * **/

exports.DepartmentCollection = departments;

/**
 *  staff Instantiation
 *
 * **/

exports.StaffCollection = staffs;

/**
 *  Student Instantiation
 *
 * **/

exports.StudentCollection = students;


/**
 *  Book Instantiation
 *
 * **/

exports.BookCollection = books;


/**
 *  Course Instantiation
 *
 * **/

exports.CourseCollection = courses;

exports.db = connection;