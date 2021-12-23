const mysql = require('promise-mysql')
const config = require('./config')

let connection = null

connection = mysql.createConnection({
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpass,
  database: config.dbname
})

function getConnection () {
  return connection
}

module.exports = { getConnection }
