const inquirer = require("inquirer");
const createConnection = require('./server.js');
const constructors = require("./dbQueryConstructors.js")



const questions = [
    {
        type: "list",
        name: "viewAndUpdateOptions",
        message: "Which of the following would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role"]
    }
]




let init = async () => {
    const db = await createConnection();
    inquirer.prompt(questions).then((answers) => {
        if (answers.viewAndUpdateOptions == "View All Departments") {
            db.query(constructors.viewAllDepartments())
            .then(async ([rows, fields]) => {
                await console.table(rows);
                init();
              })
              .catch((err) => {
                console.log(err);
              });
        }
        if (answers.viewAndUpdateOptions == "View All Roles") {
            db.query(constructors.createRolesTable())
                .then(async ([rows, fields]) => {
                    await console.table(rows);
                    init();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (answers.viewAndUpdateOptions == "View All Employees") {
            db.query(constructors.createEmployeesTable())
            .then(async ([rows, fields]) => {
                await console.table(rows);
                init();
            })
            .catch((err) => {
                console.log(err);
            });
        }
        if (answers.viewAndUpdateOptions == "Add A Department") {
            //ask name of department
            inquirer
                .prompt([
                    {
                        name: "departmentName",
                        type: "input",
                        message: "What is the name of the department?"
                    }
                ])
                .then((answers) => {
                    db.query(constructors.addDepartment(answers.departmentName));
                    db.query(constructors.viewAllDepartments())
                        .then(async ([rows, fields]) => {
                            await console.table(rows);
                            init();
                            })
                            .catch((err) => {
                            console.log(err);
                            });
                });
        }
        if (answers.viewAndUpdateOptions == "Add A Role") {
            let departmentNames = [];
            db.query('SELECT department_name FROM departments;')
                .then(async (results) => {
                    await results[0].forEach((departmentName) => {
                        departmentNames.push(departmentName.department_name);
                    })
                    return inquirer.prompt([
                        //return inquirer.prompt so that the promise it creates can be chained upon, it returns the answers
                        {
                            name: "roleName",
                            type: "input",
                            message: "What is the name of the role?"
                        },
                        {
                            name: "salary",
                            type: "input",
                            message: "What is the salary of the role?"
                        },
                        {
                            name: "departmentName",
                            type: "list",
                            message: "Which department is the role part of it?",
                            choices: departmentNames
                        }
                    ])
                })
                .then(async (answers) => {
                    let department_id;
                    await db.query(`SELECT departments.id FROM departments WHERE departments.department_name = "${answers.departmentName}";`)
                        .then((results) => {
                            department_id = results[0][0].id;
                        });
                    await db.query(constructors.addRole(answers.roleName, department_id, answers.salary));
                    //
                    //this code that follows logs the table out to see the added role
                    await db.query(constructors.createRolesTable())
                        .then(([rows, fields]) => {
                            console.table(rows);
                            })
                            .catch((err) => {
                            console.log(err);
                            });
                    init();
                })
            };
        if (answers.viewAndUpdateOptions == "Add An Employee") {
            async function addingEmployee() {
                let roleTitles = [];
                let managerNames = [];
                await db.query("SELECT roles.title FROM roles;")
                    .then(async (results) => {
                        await results[0].forEach((roleTitle) => {
                            roleTitles.push(roleTitle.title);
                        }
                    )
                });  
                await db.query("SELECT managers.managers_name FROM managers;")
                    .then(async (results) => {
                        await results[0].forEach((managerName) => {
                            managerNames.push(managerName.managers_name);
                        }
                    )
                });

                inquirer
                    .prompt([
                        {
                            name: "employeeFirstName",
                            type: "input",
                            message: "What is the employee's first name?"
                        },
                        {
                            name: "employeeLastName",
                            type: "input",
                            message: "What is the employee's last name?"
                        },
                        {
                            name: "employeeRole",
                            message: "Which of the following is their role?",
                            type: "list",
                            choices: roleTitles
                        },
                        {
                            name: "employeeManager",
                            message: "Who is their manager?",
                            type: "list",
                            choices: managerNames
                        }
                    ])
                    .then(async (answers) => {
                        let roleID;
                        let managersID;
                        await db.query(`SELECT roles.id FROM roles WHERE roles.title = "${answers.employeeRole}";`)
                            .then ((results) => {
                                roleID = results[0][0].id;
                            })
                        await db.query(`SELECT managers.id FROM managers WHERE managers.managers_name = "${answers.employeeManager}";`)
                            .then ((results) => {
                                managersID = results[0][0].id;
                            })
                        await db.query(constructors.addEmployee(answers.employeeFirstName, answers.employeeLastName, roleID, managersID))
                        await db.query(constructors.createEmployeesTable())
                            .then(([rows, fields]) => {
                                console.table(rows);
                                })
                                .catch((err) => {
                                console.log(err);
                                });
                        init();
                    }
                )
            }
            addingEmployee();
        }

        if (answers.viewAndUpdateOptions == "Update An Employee Role") {
            let employeesNames = [];
            let roleTitles = [];
            db.query(`SELECT employees.first_name FROM employees`)
                .then(async (results) => {
                    await results[0].forEach((employeeName) => {
                        employeesNames.push(employeeName.first_name);
                    });
                    await db.query("SELECT roles.title FROM roles;")
                        .then(async (results) => {
                            await results[0].forEach((roleTitle) => {
                                roleTitles.push(roleTitle.title);
                            }
                        )
                        });
                    inquirer
                        .prompt([
                            {
                                name: "employeeName",
                                type: "list",
                                message: "What is the name of the employee?",
                                choices: employeesNames
                            },
                            {
                                name: "roleTitle",
                                message: "What is their new role?",
                                type: "list", 
                                choices: roleTitles
                            }
                        ])
                        .then(async (answers) => {
                            let roleID;
                            let employeeID;
                            await db.query(`SELECT roles.id FROM roles WHERE roles.title = "${answers.roleTitle}";`)
                                .then ((results) => {
                                    roleID = results[0][0].id;
                                })
                            await db.query(`SELECT employees.id FROM employees WHERE employees.first_name = "${answers.employeeName}";`)
                                .then ((results) => {
                                    employeeID = results[0][0].id;
                                })
                            await db.query(constructors.updateEmployeeRole(roleID, employeeID));
                            db.query(constructors.createEmployeesTable())
                                .then(async ([rows, fields]) => {
                                    await console.table(rows);
                                    init();
                                    })
                                    .catch((err) => {
                                    console.log(err);
                                });
                        })
                        
                }
            )
        }
    })
}

init();