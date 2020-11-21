USE thjgsjh6mvck6pc7;


CREATE TABLE farmer (
    id INT NOT NULL AUTO_INCREMENT,
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


