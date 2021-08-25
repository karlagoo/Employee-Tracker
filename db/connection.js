// need to connect application to mySQL
const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Babyboytaro21!',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

db.connect();

db.query = util.promisify(db.query);

module.exports = db;

