const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'db', 
     user:'root', 
     password: '840917',
     database: 'studentprojekt',
     connectionLimit: 5
});

module.exports = pool