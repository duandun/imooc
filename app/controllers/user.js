var User = require('../models/user.js');
// signin
exports.signin = function(req, res) {

};

exports.signup = function(req, res) {

};
exports.logout = function(req, res) {

};
exports.list = function(req, res) {

};

	app.post('/user/signin', function(req, res) {
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
				return res.redirect('/');
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
				}
			});
		});
	});

	// logout
	app.get('/logout', function(req, res) {
		delete req.session.user;
		delete app.locals.user;
		res.redirect('/');
	});

	// signup
	app.post('/user/signup', function(req,res) {
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
				return res.redirect('/');
			} else {
				var user = new User(_user);
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
