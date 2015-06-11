var redis = require('redis');
var config = require('../../config');
var client = redis.createClient(config.redis);
var namespace = 'uc';

client.on('connect', function () {
    console.log('Connect to the redis server');
    client.set('test', 'This is a string of redis test.', redis.print);
    client.hset('UC', 'hash_test', 'This is a string of redis hash test.', redis.print);
});

module.exports = {
	test: function(){
    	console.log('get a string from redis server');
		client.get('test', redis.print);
		client.hget('UC', 'hash_test', function(err, result){
			console.log(result.toString());
		});
	},
	set: function(key, value){
		client.hset(namespace, key, value);
	},
	get: function(key, value, cb){
		client.hget(namespace, key, cb);
	}
};