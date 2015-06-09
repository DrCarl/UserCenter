// Service that support the user module

//  Load the user DAO
var userDao = require('../dao/UserDAO');
var crypto = require('../util/encryption');


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
    			cb(new Error('用户已存在'));
    		}else{
                dto.password = crypto.md5(dto.password);
    			userDao.insert(dto, cb);
    		}
    	});
    },
    login: function(dto, cb){
        userDao.select({login_name: dto.login_name}, function(err, result){
            if(err){
                cb(err);
            }else{
                if(result && result.length > 0){
                    user = result[0];
                    if(user.password == crypto.md5(dto.password)){
                        cb(err, user);
                    }else{
                        cb(new Error('密码错误'));
                    }
                }else{
                    cb(new Error('用户不存在'));
                }
            }
        });
    }
};
