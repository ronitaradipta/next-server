require('dotenv').config({
  path: '../.env',
});

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
  },
  // test: {
  //   username: 'root',
  //   password: null,
  //   database: 'database_test',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  // },
  // production: {
  //   username: MYSQLUSER,
  //   password: MYSQLPASSWORD,
  //   database: MYSQLDATABASE,
  //   host: MYSQLHOST,
  //   dialect: 'mysql',
  // },
};
