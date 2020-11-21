### Schema

USE thjgsjh6mvck6pc7;

CREATE TABLE farmer (  
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL ,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
    product_availability BOOLEAN NOT NULL,
    farmer_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (farmer_id) REFERENCES farmer(id)
);

-- Updates the row where the column name is products --
UPDATE products
SET product_availability = true, product_name = "Carrot"
WHERE id = 1;

SELECT * FROM products;