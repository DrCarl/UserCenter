module.exports = {
  "name": "User Center",
  "version": "0.0.1",
  "env": {
    "development": {
      "namespace": "UC",
      "session": {
        "expire": 600000,
        "secret": "user center"
      },
      "mysql": {
        "host": "127.0.0.1",
        "port": "3306",
        "user": "root",
        "password": "1227",
        "database": "my-app"
      },
      "redis": {
        "host": "127.0.0.1",
        "port": "6379",
        "secret": "user center"
      }
    },
    "test": {

    },
    "product":{

    }
  }
}
