DROP DATABASE IF EXISTS bestBuy_db;

CREATE DATABASE bestBuy_db;

USE bestBuy_db;

CREATE TABLE departments {
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Department_Name VARCHAR(30) NOT NULL,
    PRIMARY KEY (ID)
}

CREATE TABLE roles {
    id INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(30) NOT NULL,
    Salary DECIMAL NOT NULL,
    Department_ID VARCHAR(30) NOT NULL, //this will link to the department that the role matches to
    FOREIGN KEY (Department_ID),
    REFERENCES departments(id),
    PRIMARY KEY(id)
}

CREATE TABLE employees {
    id INT NOT NULL AUTO_INCREMENT,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    Role_ID VARCHAR(30) NOT NULL,
    FOREIGN KEY (Role_ID),
    REFERENCES roles(id),
    MANAGERS_ID INT NOT NULL
}