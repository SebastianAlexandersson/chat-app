const mariadb = require('mariadb');
const db = () => {
	return mariadb.createConnection({
		host: 'db', 
		user:'root', 
		password: 'asdf123',
		database: 'studentprojekt',
	});
}

module.exports = db