const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);
const cTable = require(`console.table`);
const startMenu = require(`../server`);
const map = require(`map`);

// Imported query variables for every selected option
const {viewAll, viewRoles, viewDepartments} = require(`./sqlQuery`);
// Imports protect file with sensitive information
require('dotenv').config()

                    // Connects to MySQL and USES database
const db = mysql.createConnection (
    {
        host: process.env.myHost,
        user: process.env.myUser,
        password: process.env.myPassword,
        database: process.env.myDatabase
    }
);

                                // PROMPTS
const addEmployee = () => {
    inquirer.prompt ([
        {
            type: `input`,
            name: `first`,
            message: `Enter the employee's first name.`
        },
        {
            type: `input`,
            name: `last`,
            message: `Enter the employee's last name.`
        },
    ])
    .then((name) => {
        const startMenu = require(`../server`);
        const employee = [name.first, name.last];
        console.log(employee);
        db.promise().query(`SELECT roles.id, roles.title FROM roles`)
        .then(((data) => { 
            const roleList = data[0].map(({id, title}) => ({value: id, name: title}))
            inquirer.prompt ([
                {
                    type: `list`,
                    name: `roleOption`,
                    message: `Assign a role to the employee.`,
                    choices: roleList
                }
            ])
            .then((roleData) => {
                employee.push(roleData.roleOption)
                console.log(employee);
                db.promise().query(`INSERT INTO employees (first_name, last_name, role_id) VALUES (${employee[0]}, ${employee[1]}, ${employee[2]})`)
                .then(() => {
                    console.log(`Employee has been added to the database!`)
                    startMenu();
                })
            })
        }))
    })}
        
const viewAllRoles = () => { 
    const startMenu = require(`../server`);
    db.query(viewRoles, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            console.table(data);
            startMenu();
        }
    })
    }

module.exports = { addEmployee, viewAllRoles };