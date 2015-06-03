var userDao = require("../dao/UserDAO");

module.exports = {
    getUsers: function(start, len, cb){
        userDao.query(start, len, cb);
    },
    getUserById: function(id, cb) {
        userDao.get(id, cb);
    },
    register: function(dto, cb){

    	userDao.select({login_name: dto.login_name}, function(err, result){
    		if(result && result.length > 0){
    			cb(new Error("用户已存在"));
    		}else{
    			userDao.insert(dto, cb);
    		}
    	});
    }
};
