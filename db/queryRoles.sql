      SELECT roles.id                    AS ID,
             roles.title                 AS Title_of_Role,
             departments.department_name AS Department_Name,
             roles.salary                AS Role_Salary
        FROM roles
  INNER JOIN departments
          ON roles.department_id = departments.id;
