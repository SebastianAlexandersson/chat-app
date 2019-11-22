const mariadb = require('mariadb');
const db = () => {
	return mariadb.createConnection({
		host: 'db', 
		user:'root', 
		password: '840917',
		database: 'studentprojekt',
	});
}

module.exports = db