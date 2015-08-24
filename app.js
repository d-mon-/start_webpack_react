'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');



var mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/blog_test');
var Schema = mongoose.Schema;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    var userSchema = new Schema({
        'email': String
    }, { _id:false, autoIndex: false});
    mongoose.model('users', userSchema);
    var User = mongoose.model('users');

    var user = new User();
    user.email = "test@test.test";
    console.log(user);
    user.save(function (err, doc) {
        console.log(err, doc);
        if (err) { throw err; }
        console.log('success');
        User.find({email: doc.email}, function (err, docs) {
            console.log(err);
            if (err) { throw err; }
            console.log(docs);
        });
    });
});



require("node-jsx").install();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/' +  app.get('env'))));

//DAO

//controllers
var indexController = require('./controller/index');

//routes
var routes = require('./routes/index')(indexController);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
        /*
        res.render('error', {
            message: err.message,
            error: err
        });*/
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
    /*
     res.render('error', {
     message: err.message,
     error: {}
     });*/
});


module.exports = app;
