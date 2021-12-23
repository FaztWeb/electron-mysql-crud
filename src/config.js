require('dotenv').config()

module.exports = {
  dbhost: process.env.DB_HOST,
  dbuser: process.env.DB_USER,
  dbpass: process.env.DB_PASS,
  dbname: process.env.DB_NAME
}
