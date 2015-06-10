var _ = require('underscore');
var Index = require('../app/controllers/index.js');
var User = require('../app/controllers/user.js');
var Movie = require('../app/controllers/movie.js');

module.exports = function(app) {
	// pre handle user
	app.use(function(req, res, next) {
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	});

	app.get('/', Index.index);
	app.post('/user/signup', User.signup);
	
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
};