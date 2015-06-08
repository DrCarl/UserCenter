var router = require('express').Router();
var user = require('../src/action/UserAction');
var userService = require("../src/service/Userservice");

var app = require("express")();


/* modules */
router.use('/users', user);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* GET login page. */
router.get('/login', function(req, res) {
    res.render('login',{
    	title: "Sign In"
    });
});

/* GET register page. */
router.get('/join', function(req, res) {
    res.render('register',{
    	title: "Sign Up"
    });
});

/* POST to login */
router.post('/session', function(req, res, next) {
	var  dto = {
		login_name: req.body.login_name,
		password: req.body.password
	};
    userService.login(dto, function(err, result){
    	if(err){
    		next(err);
    	}else{
    		res.cookie["userid"] = result.id;
    		res.cookie('user_id', 1234, {maxAge:600000, httpOnly:true, path:'/', secure:true});
    		res.setHeader("Set-Cookie",["id=" + result.id]);
    		res.redirect("/");
    	}
    });
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
    		res.redirect("/users/" + result.insertId);
		}
	})
});


module.exports = router;
