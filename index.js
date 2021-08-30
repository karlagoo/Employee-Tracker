const db = require('./db/connection');
const inquirer = require('inquirer');
const gradient = require('gradient-string');

function init() {
    startPrompt();
}
console.log(gradient.rainbow('Employee Manager'));

function whatsNext() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do next?",
            name: "next",
            choices: ["go back", "quit"]
        }
    ]).then(response => {
        if (response.next == "go back") {
            startPrompt();
        } else {
            quit();
        }
    })
}

function startPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "initialPrompt",
            choices: ["View All Departments", "Add a Department", "View All Roles", "Add a Role", "View All Employees", "Add an Employee", "Update an Employee Role", "Quit"]
        }
    ]).then(response => {
        console.log(response)
        switch (response.initialPrompt) {
            case "View All Departments":
                viewAllDepartments()
                break;
            case "Add a Department":
                addDepartment()
                break;
            case "View All Roles":
                viewAllRoles()
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
            case "Quit":
                quit();
                break;
            default:
                quit();
        }
    })

}

function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        whatsNext();
    })
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        whatsNext();
    })
}

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        whatsNext();
    })
}

function addRole() {
    db.query('SELECT COUNT(*) FROM role', function (err, result) {
        console.log(result);
        inquirer.prompt([
            {
                type: "input",
                message: "What is role title?",
                name: "title"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "salary"
            },
            {
                type: "list",
                message: "Pick department",
                name: "department_id",
                choices: departmentIds
            }
        ]).then(response => {
            db.query('INSERT INTO role (title, salary, department_id VALUES (?,?,?)', [response.title, response.salary, response.department_id], function (err, results) {
                console.table(results);
            })
        })
    })

}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        }
    ]).then(response => {
        db.query('INSERT INTO department (name) VALUES (?)', response.departmentName, function (err, results) {
            console.table(results);
            viewAllDepartments();
            startPrompt();
        })
    })
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name"
        },
        {
            type: "input",
            message: "What is the employee's title?",
            name: "role_id"
        },
        {
            type: "input",
            message: "Who is the employee's manager (use value 1-9 for the manager's?",
            name: "manager_id"
        }
    ]).then(response =>{
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', response.first_name, response.last_name, response.role_id, reponse.manager_id, function (err, results){
            console.table(results);

        })
    })
}

function updateEmployeeRole(){
    inquirer.prompt([
        {

        }
    ])
}

function quit() {
    console.log("Goodbye!");
    process.exit();
}

init();