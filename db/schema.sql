DROP DATABASE IF EXISTS bestBuy_db;

CREATE DATABASE bestBuy_db;

USE bestBuy_db;

CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL, 
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

CREATE TABLE managers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    managers_name VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    managers_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (managers_id) REFERENCES managers(id)
);
