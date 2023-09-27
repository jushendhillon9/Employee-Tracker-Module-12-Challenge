function viewAllDepartments () {
    return `SELECT * FROM departments;`;
}

function createRolesTable () {
    return `      
    SELECT roles.id                    AS ID,
        roles.title                 AS Title_of_Role,
        departments.department_name AS Department_Name,
        roles.salary                AS Role_Salary
    FROM roles
    INNER JOIN departments
        ON roles.department_id = departments.id;
`;
}

function createEmployeesTable () {
    return `
SELECT employees.id                AS Employee_ID,
       employees.first_name        AS First_Name,
       employees.last_name         AS Last_Name,
       roles.title                 AS Title_of_Role,
       departments.department_name AS Department_Name,
       roles.salary                AS Role_Salary,
       managers.managers_name      AS Managers_Name
  FROM employees

INNER JOIN roles
        ON employees.role_id = roles.id
INNER JOIN managers
        ON employees.managers_id = managers.id
INNER JOIN departments
        ON roles.department_id = departments.id;`
}

function addDepartment (department_name) {
    return `
    INSERT INTO 
        departments (department_name)
             VALUES ("${department_name}");`;
}

function addRole (title, department_id, salary) {
    return `
    INSERT INTO 
        roles (title, department_id, salary)
       VALUES ("${title}", "${department_id}", "${salary}");`;
}


function addEmployee (first_name, last_name, role_id, managers_id) {
    return `
    INSERT INTO 
        employees (first_name, last_name, role_id, managers_id)
           VALUES ("${first_name}", "${last_name}", ${role_id}, "${managers_id}");`;
}

function updateEmployeeRole (newRoleID, employeeID) {
    return `UPDATE employees SET employees.role_id = ${newRoleID} WHERE employees.id = "${employeeID}";`
}


module.exports = {viewAllDepartments, createRolesTable, createEmployeesTable, addDepartment, addRole, addEmployee, updateEmployeeRole};


