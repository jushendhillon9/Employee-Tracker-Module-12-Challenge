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
         ON roles.department_id = departments.id;
