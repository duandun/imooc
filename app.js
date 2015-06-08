var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var port = process.env.PORT || 3000;
var app = express();

var Movie = require('./models/movie');
var User = require('./models/user.js');
mongoose.connect('mongodb://localhost/imooc');

app.locals.moment = require('moment');
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);
console.log('imooc started on port' + port);

// index page
app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if(err) {
			console.log(err);
		}
		res.render('index', {
			title: 'imooc 首页',
			movies: movies
	});
	})
	
});

// signup
app.post('/user/signup', function(req,res) {
	//  /user/signup/:userid
	// var _userid = req.params.userid;

	// /user/signup/111?userid=1112
	// var _userid = req.query.userid;

//	var _user = req.body.user;
	var _user = req.body.user;
	var user = new User(_user);
	User.find({name: _user.name}, function(err, user){
		if (err) {
			console.log(err);
		}
		if (user) {
			return res.redirect('/');
		} else {
			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				console.log(user);
				res.redirect('/admin/userlist');
			});
		}
	});
	
});

// user list page
app.get('/admin/userlist', function(req, res) {
	User.fetch(function(err, users){
		if (err) {
			console.log(err);
		}
		res.render('userlist', {
			title: 'user 列表页',
			users: users
		})
	});
});

// detail page
app.get('/movie/:id', function(req, res) {
	var id = req.params.id;
	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc ' + movie.title,
			movie: movie
	});
	})
});

// 	admin update movie
app.get('/admin/update/:id', function(req, res) {
	var id = req.params.id;
	if(id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新页' ,
				movie: movie
			});
		});
	}
});

// admin post movie
app.post('/admin/movie/new', function(req, res) {
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	if(id != 'undefined') {
		Movie.findById(id, function(err, movie) {
			if(err) {
				console.log(err);
			}
			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie){
				if (err) {
					console.log(err);
				}
				res.redirect('/movie/' + movie._id);
			});
		})
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash,
		});
		_movie.save(function(err, movie) {
			if (err) {
				console.log(err);
			} 
			res.redirect('/movie/' + movie._id);
		});
	}
});

//list page
app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('list', {
			title: 'imooc 列表页',
			movies: movies
		});
	});
});

// admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'imooc 后台录入页面',
		movie: {
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster: '',
			language: '',
			flash: '',
			summary: ''
		}
	});
});

// list delete movie
app.delete('/admin/list', function(req, res) {
	var id = req.query.id;
	console.log(req.query);
	if (id) {

		Movie.remove({_id: id}, function(err, movie) {
			if (err) {
				console.log(err);
			} else {
				res.json({success: 1});
			}
		});
	}
});