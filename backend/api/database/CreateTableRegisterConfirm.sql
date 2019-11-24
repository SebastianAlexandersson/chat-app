CREATE TABLE IF NOT EXISTS register_confirm (
userid TEXT,
email TEXT,
first_name TEXT,
last_name TEXT,
password TEXT,
expires_on BIGINT,
registration_id TEXT
) ENGINE=INNODB;