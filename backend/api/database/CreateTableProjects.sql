CREATE TABLE IF NOT EXISTS projects (
author TEXT,
headline TEXT,
text_body TEXT,
tags TEXT,
project_id TEXT,
created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)