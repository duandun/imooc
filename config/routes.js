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

	// index page
	app.get('/', Index.index);

	// User
	app.post('/user/signup', User.signup);
	app.post('/user/signin', User.signin);
	app.get('/signin', User.showSignin);
	app.get('/signup', User.showSignup);
	app.get('/logout', User.logout);
	app.get('/admin/user/list', User.signinRquired, User.adminRequired, User.list);

	// Movie
	app.get('/movie/:id', Movie.detail);
	app.get('/admin/movie/new', User.signinRquired, User.adminRequired,Movie.new);
	app.put('/admin/movie/update/:id', User.signinRquired, User.adminRequired,Movie.update);
	app.post('/admin/movie', User.signinRquired, User.adminRequired, Movie.save);
	app.get('/admin/movie/list', User.signinRquired, User.adminRequired, Movie.list);
	app.delete('/admin/movie/list', User.signinRquired, User.adminRequired, Movie.del);
};