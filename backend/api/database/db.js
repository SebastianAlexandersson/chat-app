const mariadb = require('mariadb')
const db = () => {
	return mariadb.createConnection({
		host: 'db', 
		user: process.env.DB_USER, 
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DB,
	})
}

module.exports = db