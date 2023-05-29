const pkg = require('../../package.json');

module.exports = {
  applicationName: pkg.name,
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/shopper'
  },
  redis: {
    port: 7379,
    client: null
  },
  mysql: {
    options: {
      host: "localhost",
      port: 3406,
      database: "shopper",
      dialect: "mysql",
      username: "root",
      password: "mypassword"
    },
    client: null
  }
};
