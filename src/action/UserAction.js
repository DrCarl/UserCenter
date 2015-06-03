var router = require('express').Router();

var userService = require('../service/UserService');

router.use('/', function(req, res, next) {
    console.log('It comes to the user module');
    next();
});
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
router.param('id', function(req, res, next, id) {
    userService.getUserById(id, function(err, result) {
    	if(result.length == 0){
    		next(new Error("用户不存在"));
    	}else{
	        req.user = result;
	        next();
    	}
    });
});

router.get('/:id', function(req, res) {
    res.json(req.user);
});




module.exports = router;

