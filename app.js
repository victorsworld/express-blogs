var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogsRouter = require("./routes/blogs")

var app = express();

//invoke middleware
//middleware: functions are used during a request/response to a specific route or all routes
//logger comes from the morgan package helps us console log the request coming in
app.use(logger('dev'));
//express.json() is middleware that helps us read JSON from the incoming request
app.use(express.json());
//express.urlencoded({extended: fals}) helps us parse url-encoded form data req.body
app.use(express.urlencoded({ extended: false }));
//cookieParser helps with handling incoming (req) cookies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/blogs", blogsRouter)

module.exports = app;
