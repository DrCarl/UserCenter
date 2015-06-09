var config = require("../../config");
var env = process.env.NODE_ENV || 'development';
// Load the module of mysql
var mysql = require('mysql');
// Create a connect pool of mysql
var options = config.env[env].mysql;
var pool = mysql.createPool(options);
// The body of DAO
var DAO = function(table, dao) {
    this.table = table;
    this.dao = dao || '';
};

DAO.prototype.pool = pool;

// Get the data with id
DAO.prototype.get = function(id, cb) {
    var _ = this;
    pool.getConnection(function(err, connection) {
        var sql = 'SELECT * FROM ?? WHERE id = ?';
        var query = connection.query(sql, [_.table, id], cb);
        console.log(_.dao + ' : ' + query.sql);
    });
};

// Get the list of data
DAO.prototype.query = function(start, len, cb){
    var _ = this;
    var limit = '';
    if(len > 0){
        limit = ' limit ' + start + ',' + len;
    }
    pool.getConnection(function(err, connection) {
        var sql = 'SELECT * FROM ??' + limit;
        var query = connection.query(sql, [_.table], cb);
        console.log(_.dao + ' : ' + query.sql);
    });
};

// Get data by conditions
DAO.prototype.select = function(dto, cb){
    var _ = this;
    var fields = [];
    var params = [_.table];
    for (var key in dto) {
        fields.push(key + ' = ? ');
        params.push(dto[key]);
    }
    pool.getConnection(function(err, connection) {
        var sql = 'SELECT * FROM ?? WHERE ' + fields.join(', ');
        var query = connection.query(sql, params, cb);
        console.log(_.dao + ' : ' + query.sql);
    });

};

// Insert an item of data
DAO.prototype.insert = function(dto, cb) {
    var _ = this;
    var fields = [];
    var params = [_.table];
    for (var key in dto) {
        fields.push(key + ' = ? ');
        params.push(dto[key]);
    }
    pool.getConnection(function(err, connection) {
        var sql = 'INSERT INTO ?? SET ' + fields.join(', ') + ', add_time = NOW(), update_time = NOW()';
        var query = connection.query(sql, params, cb);
        console.log(_.dao + ' : ' + query.sql);
    });
};

module.exports = DAO;