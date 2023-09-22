const inquirer = require("inquirer");

const questions = [
    {
        type: "list",
        name: "viewAndUpdateOptions",
        message: "Which of the following would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role"]
    }
]

let handleViewAndUpdateRequest = (answers) => {
    if (answers.viewAndUpdateOptions == "View All Departments") {
        //do something
    }
    if (answers.viewAndUpdateOptions == "View All Roles") {
        //do something
    }
    if (answers.viewAndUpdateOptions == "View All Employees") {
        //do something
    }
    if (answers.viewAndUpdateOptions == "Add A Department") {
        //do something
    }
    if (answers.viewAndUpdateOptions == "Add A Role") {
        //do something
    }
    if (answers.viewAndUpdateOptions == "Add An Employee") {
        //do something
    }
    if (answers.viewAndUpdateOptions == "Update An Employee Role") {
        //do something
    }
}


let init = () => {
    inquirer.prompt(questions).then((answers) => {
        
    })
}