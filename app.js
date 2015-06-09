// Start file
// load modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var domain = require('domain');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

// load router
var router = require('./router');

// new app
var app = express();

// Get the environment variables and add to the templates
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// Read the config.json
var config=require('./config').env[env];
console.log(config);

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/favicon.ico'));

// Use morgan module to output log info
app.use(morgan('dev'));

// Use domain module to process errors
app.use(function(req, res, next){
    var d = domain.create();
    d.on('error', function(err){
        res.render('error', {
            title: 'Error',
            message: err.message,
            error: {}
        });
    });
    d.run(next);
});

/**
 * session cookie body parser
 */
// Use redis to instead of session
var redis_store = new RedisStore({
    host: "127.0.0.1",
    port: 6379
});
app.use(session({
    store: redis_store,
    secret: '123456'
}));
app.use(function (req, res, next) {
  if (!req.session) {
    console.error('session is undefine'); // handle error
  }
  next();
});

// Use bodyParser to parse the info into json in request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Use cookieParser to parse cookie
app.use(cookieParser());
// Setting the static resource location
app.use('/static', express.static(path.join(__dirname, 'public')));

// Use router
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: 'Error',
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: 'Error',
        message: err.message,
        error: {}
    });
});


module.exports = app;
