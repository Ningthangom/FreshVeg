<<<<<<< HEAD
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
=======
### Schema

USE thjgsjh6mvck6pc7;

CREATE TABLE farmer (  
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL ,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE customer (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL ,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL ,
    product_availabilty BOOLEAN NOT NULL,
    farmer_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (farmer_id) REFERENCES farmer(id);
);


CREATE TABLE sales (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL ,
    price DECIMAL NOT NULL,
    product_availabilty  NOT NULL,
    farmer_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (farmer_id) REFERENCES farmer(id);
);






INSERT proudcts (product_name,product_availabilty,farmer_id) VALUES ('TOMATO',TRUE,1);


>>>>>>> 344a3331d5f93be758380cfde808279c85e5957c
