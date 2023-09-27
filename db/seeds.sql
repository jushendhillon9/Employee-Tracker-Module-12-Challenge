INSERT INTO 
    departments (department_name)
         VALUES ("TV & Home Theater"),
                ("Audio"),
                ("Computers & Tablets"),
                ("Checkout");
INSERT INTO 
    roles (title, department_id, salary)
         VALUES ("Sales Lead", 1, 90000.00),
                ("Salesperson", 3, 50000.00),
                ("Cashier", 4, 40000.00),
                ("Computer Hardware Specialist", 3, 90000.00),
                ("Software Engineer", 3, 150000.00),
                ("Accountant", 4, 120000.00),
                ("Headphone Connoiseur", 2, 30000.00);

INSERT INTO 
    managers (managers_name)
      VALUES ("Frederick Apples"),
             ("Rick Blankenship");

INSERT INTO 
    employees (first_name, last_name, role_id, managers_id)
         VALUES ("Jeff", "Seid", 2, 1),
                ("Tommie", "Morse", 5, 2),
                ("Stephen", "Curry", 1, 1),
                ("Stacie", "Webster", 4, 1), 
                ("Susanna", "Maynard", 7, 2),
                ("Alex", "Rodriguez", 3, 2),
                ("Jeff", "James", 6, 1);


