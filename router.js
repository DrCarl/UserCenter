var router = require('express').Router();
var user = require('./src/action/UserAction');
var userService = require('./src/service/Userservice');
var session = require('./src/util/redis');

var app = require('express')();

router.use(function(req, res, next){
    next();
});

/* modules */
router.use('/users', user);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'User Center'
    });
});

/* GET login page. */
router.get('/login', function(req, res) {
    res.render('login',{
    	title: 'Sign In'
    });
});

/* GET register page. */
router.get('/join', function(req, res) {
    res.render('register',{
    	title: 'Sign Up'
    });
});

/* POST to login */
router.post('/session', function(req, res, next) {
	var  user = {
		login_name: req.body.login_name,
		password: req.body.password
	};
    userService.login(user, function(err, user){
    	if(err){
    		next(err);
    	}else{
            req.session.user_id = user.id;
    		res.redirect('/users/' + user.id);
    	}
    });
});
router.delete('/session', function(req, res){
    res.clearCookie();
    res.redirect('/');
});

/* POST to register */
router.post('/join', function(req, res, next) {
	var dto ={
		login_name : req.body.login_name,
		password : req.body.password
	}
	userService.register(dto, function(err, result){
		if(err){
			next(err);
		}else{
    		res.redirect('/users/' + result.insertId);
		}
	})
});


module.exports = router;
