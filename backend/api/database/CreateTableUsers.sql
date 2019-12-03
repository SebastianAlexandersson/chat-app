CREATE TABLE IF NOT EXISTS users (
userid TEXT,
email TEXT,
first_name TEXT,
last_name TEXT,
password TEXT,
program TEXT,
created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;