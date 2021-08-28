const db = require ('./db/connection');
const inquirer = require('inquirer');

function init(){
    startPrompt();
}

function startPrompt(){
    inquirer.prompt ([
        {
            type: "list",
            message: "What would you like to do?",
            name: "initialPrompt",
            choices: ["View All Departments","Add a Department", "View All Roles", "Add a Role", "View All Employees", "Add an Employee", "Update an Employee Role", "Quit"]
        }
    ]).then(response => {
        switch (response.choices) {
            case "View All Departments" :
                viewAllDepartments()
                break;
            case "Add a Department":
                addDepartment()
                break;
            case "View All Roles":
                viewAllRoles ()
                break;
            case "Add a Role":
                addRole()
                break;
            case "View All Employees":
                viewAllEmployees()
                break;
            case "Add an Employee":
                addEmployee()
                break;
            case "Update an Employee Role":
                updateEmployeeRole()
                break;
            default: 
                quit()
                break;
        }
    })

}
//Inquirer to list out options: view all employees, view all departments, etc.
//Depending on which option user chooses
//call  and execute the appropriate function
//meaning for each one of the options, you need to create a function for each of them.

function viewAllDepartments(){
    db.query('SELECT * FROM department', function (err, results){
        console.table(results);
    }).then(() => startPrompt());
}

function viewAllEmployees(){
    db.query('SELECT * FROM employee', function (err, results){
        console.table(results);
    }).then(() => startPrompt());
}

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results){
        console.table(results);
    }).then(() => startPrompt());
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        }
    ]).then(response =>{
        db.addDepartment(response);
    })
}

init ();

