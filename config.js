var env = process.env.NODE_ENV || 'development';
var port = normalizePort(process.env.PORT || '3000');


// environment info
var envs = {
  development: {
    session: {
      expire: 600000,
      secret: 'user center'
    },
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '1227',
      database: 'my-app'
    },
    redis: {
      host: '127.0.0.1',
      port: '6379',
      secret: 'user center'
    }
  }
}
// public info
var config = {
  name: 'User Center',
  namespace: 'UC',
  version: '0.0.1',
  env: env,
  port: port
};

if(!(env in envs)){
  throw new Error("No configuration about this environment in configuration file");
}

for(var i in envs[env]){
  config[i] = envs[env][i];
}


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = config