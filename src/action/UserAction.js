//  USER MODULE
var router = require('express').Router();

var userService = require('../service/UserService');

//  LOG about module
router.use(function(req, res, next) {
    console.log('It comes to the user module');
    next();
});

// GET the list of users
router.get('/', function(req, res, next) {
	var start = req.query.start || 0;
	var len = req.query.len || -1;

    userService.getUsers(start, len, function(err, result){
    	if(err){
    		next(err);
    	}else{
    		res.send(result);
    	}
    });
});

// Parse the user id and set the user info into req
router.param('user_id', function(req, res, next, user_id) {
    userService.getUserById(id, function(err, result) {
    	if(result.length == 0){
    		next(new Error("用户不存在"));
    	}else{
	        req.user = result;
	        next();
    	}
    });
});

// GET the user info whose id is input
router.get('/:user_id', function(req, res) {
    res.json(req.user);
});

module.exports = router;

