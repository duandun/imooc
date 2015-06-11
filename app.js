var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;
var app = express();
mongoose.connect('mongodb://localhost/imooc');
var dbUrl = 'mongodb://localhost/imooc';
app.locals.moment = require('moment');
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
	secret: 'imooc',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}));

if ('development' === app.get('env')) {
	app.set('showStackError', true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
}

require('./config/routes.js')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);
console.log('imooc started on port' + port);

