var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOST,
  user     : process.env.RDS_USER,
  password : process.env.RDS_PASS,
  port     : process.env.RDS_PORT
});

module.exports = connection;
