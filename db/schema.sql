DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
	id INT auto_increment NOT NULL,
    burger_name VARCHAR(100) NOT NULL,
    devoured BOOLEAN default FALSE,
    PRIMARY KEY (id)
    );
    
INSERT INTO burgers (burger_name, devoured)
	VALUES 
		('Sweet Home Avocado', false),
		('Beet-er Believe It', false),
        ('Eggslut', false);