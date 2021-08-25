const db = require ('./db/connection');

//Inquirer to list out options: view all employees, view all departments, etc.
//Depedning on which option user chooses
//call  and execute the appropriate function
//meaning for each one of the options, you need to create a function for each of them.


function viewAllEmployees(){
    db.query('SELECT * FROM employee', function (err, results){
        console.table(results);
    })
}

viewAllEmployees()