CREATE TABLE users
(
id int(11) NOT NULL AUTO_INCREMENT,
email varchar(255) NOT NULL UNIQUE,
password varchar(255) NOT NULL,
salt varchar(255) NOT NULL,
first_name varchar(255) NOT NULL,
last_name varchar(255) NOT NULL,
joined_at datetime NOT NULL,
address text,
UNIQUE KEY unique_name (first_name, last_name) USING BTREE,
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
