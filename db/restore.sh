#!/bin/sh
mongorestore --collection departments --db bookTrackingApp bookTrackingApp/departments.bson
mongorestore --collection courses --db bookTrackingApp bookTrackingApp/courses.bson
mongorestore --collection books --db bookTrackingApp bookTrackingApp/books.bson
mongorestore --collection staffs --db bookTrackingApp bookTrackingApp/staffs.bson
mongorestore --collection students --db bookTrackingApp bookTrackingApp/students.bson
