const db = require ('./db/connection');
const inquirer = require('inquirer');

function startPrompt(){
    inquirer.prompt ([
        {
            type: "list",
            message: "What would you like to do?",
            name: "initialPrompt",
            choices: ["View All Departments","Add a Department", "View All Roles", "Add a Role", "View All Employees", "Add an Employee", "Update an Employee Role"]
        }
    ])

}
//Inquirer to list out options: view all employees, view all departments, etc.
//Depending on which option user chooses
//call  and execute the appropriate function
//meaning for each one of the options, you need to create a function for each of them.


function viewAllEmployees(){
    db.query('SELECT * FROM employee', function (err, results){
        console.table(results);
    })
}

viewAllEmployees()