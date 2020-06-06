var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var lookUser = require('./routes/record');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all("*",function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Control-Type');
	res.header('Access-Control-Allow-Methods','*');
	next();
})


//app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/lookuser',lookUser);

app.listen(8181,function(){

    console.log("服务器已经开启...");

})
module.exports = app;
