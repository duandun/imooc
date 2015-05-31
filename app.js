var express = require('express');
var bodyParser = require('body-parser');
// var app = express();

// app.set('view engine', 'jade');
// app.set('port', 3000);

// app.get('/', function(req, res){
// 	res.render('index', {title: 'imooc'});
// });
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);
console.log('imooc started on port' + port);

// index page
app.get('/', function(req, res) {
	res.render('index', {
		title: 'imooc 首页',
		movies: [{
			title: '机械战警',
			_id: 1,
			poster: ''
		},
		{
			title: '机械战警',
			_id: 2,
			poster: ''
		},
		{
			title: '机械战警',
			_id: 3,
			poster: ''
		},
		{
			title: '机械战警',
			_id: 4,
			poster: ''
		},
		{
			title: '机械战警',
			_id: 5,
			poster: ''
		},
		]
	});
});
// detail page
app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: 'imooc 详情页',
		movie: {
			doctor: '何塞',
			country: '美国',
			title: '机械战警',
			year: 2014,
			poster: '',
			language: '英语',
			flash: '',
			summary: '哈哈哈 啦啦啦，大大。'
		}
	});
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
	res.render('index', {
		title: 'imooc 后台录入页面'
	});
});