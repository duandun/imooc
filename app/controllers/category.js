var Category = require('../models/category.js');
var _ = require('underscore');


// admin post movie
exports.save = function(req, res) {
	var _category = req.body.category;
	var category = new Category(_category);
	category.save(function(err, category) {
		if (err) {
			console.log(err);
		} 
		res.redirect('/admin/category/list');
	});
};

//category list page
exports.list = function(req, res) {
	Category.fetch(function(err, categories) {
		if (err) {
			console.log(err);
		}
		res.render('categorylist', {
			title: 'imooc 分类列表页',
			categories: categories
		});
	});
};

// admin page
exports.new = function(req, res) {
	res.render('category_admin', {
		title: 'imooc 后台分类录入页面',
		category: {}
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
