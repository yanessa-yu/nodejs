var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var template = require('express-art-template');

var index = require('./routes/index.js');
var users = require('./routes/users.js');


var app = express();
//art-template性能卓越的 js 模板引擎
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', template);
app.set('view engine', 'html');
//   app.engine('art', require('express-art-template'));
//   app.set('view options', {
//       debug: process.env.NODE_ENV !== 'production'
//   });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


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
app.listen(3001)

module.exports = app;
