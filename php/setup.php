<?php

$db = new PDO('sqlite:database.sqlite');

$db->exec("CREATE TABLE models (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    url TEXT
)");

$db->exec("CREATE TABLE selections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model_id INTEGER,
    user TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)");

echo "Tables created successfully!";
?>