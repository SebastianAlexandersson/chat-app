CREATE TABLE IF NOT EXISTS messages (
message_body TEXT,
from_user TEXT,
to_user TEXT,
date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;