CREATE DATABASE electrondb;

USE electrondb;

CREATE TABLE product(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  price DECIMAL(7,3) NOT NULL
);

DESCRIBE product;

-- to change decimal range value
-- ALTER TABLE 'price' CHANGE COLUMN 'price' DECIMAL(8,2)