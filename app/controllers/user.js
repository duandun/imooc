var User = require('../models/user.js');

// signin
exports.signin = function(req, res) {
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	console.log('signin');
	User.findOne({name: name}, function(err, user) {
		if (err) {
			console.log(err);
		}
		if (!user) {
			console.log(user);
			return res.redirect('/signup');
		}

		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				console.log(err);
			}
			if (isMatch) {
				req.session.user = user;
				return res.redirect('/');
			} else {
				console.log('password is not matched');
				return res.redirect('/signin');
			}
		});
	});
};

// logout
exports.logout = function(req, res) {
	delete req.session.user;
//	delete app.locals.user;
	res.redirect('/');
};

// showSignup
exports.showSignup = function(req,res) {
	res.render('signup', {
		title: '注册页面',
	});
};

// signin
exports.showSignin = function(req,res) {
	res.render('signin', {
		title: '登录页面',
	});
};

// signup
exports.signup = function(req,res) {
	//  /user/signup/:userid
	// var _userid = req.params.userid;

	// /user/signup/111?userid=1112
	// var _userid = req.query.userid;

//	var _user = req.body.user;
	console.log('signup');
	var _user = req.body.user;	
	User.find({name: _user.name}, function(err, user){
		if (err) {
			console.log(err);
		}
		if (user.length != 0) {
			console.log(user);	
			return res.redirect('/signin');
		} else {
			var user = new User(_user);
			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				console.log(user);
				res.redirect('/');
			});
		}
	});
};

// user list page
exports.list = function(req, res) {
	User.fetch(function(err, users){
		if (err) {
			console.log(err);
		}
		res.render('userlist', {
			title: 'user 列表页',
			users: users
		})
	});
};

// midware for user
exports.signinRquired = function(req, res, next) {
	var user = req.session.user;
	if (!user) {
		return res.redirect('/signin');
	}
	next();
};

exports.adminRequired = function(req, res, next) {
	var user = req.session.user;
	if (user.role <= 10) {
		return res.redirect('/signin');
	}
	
	next();
};

	

	

	
