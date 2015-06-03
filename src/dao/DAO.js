var mysql = require('mysql');
var pool = mysql.createPool({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "1227",
    database: "my-app"
});
var DAO = function(table, dao) {
    this.table = table;
    this.dao = dao || "";
};

DAO.prototype.pool = pool;

DAO.prototype.get = function(id, cb) {
    var _ = this;
    pool.getConnection(function(err, connection) {
        var sql = "SELECT * FROM ?? WHERE id = ?";
        var query = connection.query(sql, [_.table, id], cb);
        console.log(_.dao + " : " + query.sql);
    });
};
DAO.prototype.query = function(start, len, cb){
    var _ = this;
    var limit = "";
    if(len > 0){
        limit = " limit " + start + "," + len;
    }
    pool.getConnection(function(err, connection) {
        var sql = "SELECT * FROM ??" + limit;
        var query = connection.query(sql, [_.table], cb);
        console.log(_.dao + " : " + query.sql);
    });
};
DAO.prototype.select = function(dto, cb){
    var _ = this;
    var fields = [];
    var params = [_.table];
    for (var key in dto) {
        fields.push(key + " = ? ");
        params.push(dto[key]);
    }
    pool.getConnection(function(err, connection) {
        var sql = "SELECT * FROM ?? WHERE " + fields.join(", ");
        var query = connection.query(sql, params, cb);
        console.log(_.dao + " : " + query.sql);
    });

};
DAO.prototype.insert = function(dto, cb) {
    var _ = this;
    var fields = [];
    var params = [_.table];
    for (var key in dto) {
        fields.push(key + " = ? ");
        params.push(dto[key]);
    }
    pool.getConnection(function(err, connection) {
        var sql = "INSERT INTO ?? SET " + fields.join(", ") + ", add_time = NOW(), update_time = NOW()";
        var query = connection.query(sql, params, cb);
        console.log(_.dao + " : " + query.sql);
    });
};

module.exports = DAO;