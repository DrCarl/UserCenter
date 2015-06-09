var crypto = require('crypto');

module.exports = {
	md5: function(content){
		var md5 = crypto.createHash('md5');
		md5.update(content);
		return md5.digest('hex');
	}
}