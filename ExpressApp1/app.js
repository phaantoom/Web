'use strict';
//var debug = require('debug');
var express = require('express');
//const mysql = require('mysql')
////var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup////app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.json());
//app.use('/api/chirps',routes)
//app.use(express.static(path.join(__dirname, 'public')));


//assign port number
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port ');
});


app.use('/', routes);
//app.use('/users', users);

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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//const db = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: 'nour',
//    database: 'eplmrs'
//});

//db.connect((err) => {
//    if (err) {
//        throw err;
//    }
//    console.log('MySql Connected...');
//});


/*app.set('port', process.env.PORT || 1337);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});*/

