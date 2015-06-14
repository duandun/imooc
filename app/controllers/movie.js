var Movie = require('../models/movie.js');
var Comment = require('../models/comment');
var _ = require('underscore');

// detail page
exports.detail = function(req, res) {
	var id = req.params.id;
	Movie.findById(id, function(err, movie) {
		if (err) {
			console.log(err);
		}
		Comment
			.find({movie: id})
			.populate('from', 'name')
			.exec(function(err, comments) {
				console.log(comments);
				res.render('detail', {
				title: 'imooc ' + movie.title,
				movie: movie,
				comments: comments
			});
		})
		
	});
};

// 	admin update movie
exports.update = function(req, res) {
	var id = req.params.id;
	if(id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新页' ,
				movie: movie
			});
		});
	}
};

// admin post movie
exports.save = function(req, res) {
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
		});
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
};

//list page
exports.list = function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('list', {
			title: 'imooc 列表页',
			movies: movies
		});
	});
};

// admin page
exports.new = function(req, res) {
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
};

// list delete movie
exports.del = function(req, res) {
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
};
