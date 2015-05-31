var express = require('express');
var bodyParser = require('body-parser');
// var app = express();

// app.set('view engine', 'jade');
// app.set('port', 3000);

// app.get('/', function(req, res){
// 	res.render('index', {title: 'imooc'});
// });
var path = require('path');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var app = express();

var Movie = require('./models/movie');
mongoose.connect('mongodb://localhost/imooc');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'bower_components')));
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

//list page
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: 'imooc 列表页面',
		movies: [{
			_id: 1,
			doctor: '何塞',
			country: '美国',
			title: '机械战警',
			year: 2014,
			poster: '',
			language: '英语',
			flash: '',
			summary: '哈哈哈 啦啦啦，大大。'
		}]
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