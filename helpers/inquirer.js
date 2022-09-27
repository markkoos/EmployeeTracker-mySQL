const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);
const cTable = require(`console.table`);
const map = require(`map`);

// Imported query variables for every selected option
const {viewAll, viewRoles, viewDepartments} = require(`./sqlQuery`);
const e = require('express');
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

                            // PROMPTS & QUERIES
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
        const employee = [JSON.stringify(name.first), JSON.stringify(name.last)];
        console.log(employee);
        db.promise().query(`SELECT roles.id, roles.title FROM roles;`)
        .then(((data) => { 
            const roleList = data[0].map(({id, title}) => ({value: id, name: title}));
            inquirer.prompt ([
                {
                    type: `list`,
                    name: `choice`,
                    message: `Assign a role to the employee.`,
                    choices: roleList
                }
            ])
            .then((roleData) => {
                employee.push(roleData.choice);
                console.log(employee);
                db.promise().query(`SELECT * FROM employees;`)
                .then(((data) => {
                    const managerList = data[0].map(({first_name, last_name, role_id}) => ({value: role_id, name: `${first_name} ${last_name}` }));
                    inquirer.prompt ([
                        {
                            type: `list`,
                            name: `choice`,
                            message: `Who is this employee's manager?`,
                            choices: managerList
                        }
                    ])
                    .then((managerData) => {
                        employee.push(managerData.choice);
                        db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (${employee[0]}, ${employee[1]}, ${employee[2]}, ${employee[3]});`)
                        .then(() => {
                            console.log(`Employee has been added to the database!`)
                            startMenu();
                        })
                    })
                }))
                
            })
        }))
    })}

const updateRole = () => {
    const startMenu = require(`../server`);
    const employeeStuff = [];
    db.promise().query(`SELECT employees.id AS id, first_name, last_name FROM employees;`)
    .then((data) => {
        const employeeList = data[0].map(({id, first_name, last_name,}) => ({value: id, name: `${first_name} ${last_name}`}));
        inquirer.prompt([
            {
                type: `list`,
                name: `choice`,
                message: `Select an employee to update.`,
                choices: employeeList
            }
        ])
        .then((data) => {
            employeeStuff.push(data.choice);
            db.promise().query(`SELECT roles.id, roles.title FROM roles;`)
            .then((data) => {
                const roleList = data[0].map(({id, title}) => ({value: id, name: title}));
                inquirer.prompt([
                    {
                        type: `list`,
                        name: `choice`,
                        message: `Select a role to assign`,
                        choices: roleList
                    }
                ])
                .then((roleChoice) => {
                    employeeStuff.push(roleChoice.choice);
                    console.log(employeeStuff);
                    db.promise().query(`UPDATE employees SET role_id = ${employeeStuff[1]} WHERE employees.id = ${employeeStuff[0]};`)
                    .then(() => {
                        console.log(`Employee role updated!`)
                        startMenu();
                    })
                })
            }) 
        })
    })};

const addRole = () => {
    const startMenu = require(`../server`);
    
    db.promise().query(viewDepartments)
    .then((data) => {
        const depList = data[0].map(({id, name}) => ({value: id, name: name}))
        inquirer.prompt ([
            {
                type: `input`,
                name: `name`,
                message: `What is the name of the role?`
            },
            {
                type: `input`,
                name: `salary`,
                message: `What is the salary of the role?`
            },
            {
                type: `list`,
                name: `department`,
                message: `What department does the role belong to?`,
                choices: depList
            },
        ])
        .then((data) => {
            const addRoleData = [JSON.stringify(data.name), data.salary, data.department];
            db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (${addRoleData[0]}, ${addRoleData[1]}, ${addRoleData[2]});`)
            .then(() => {
                startMenu();
            })
        })
    })
    
    
}
        
const viewAllRoles = () => { 
    const startMenu = require(`../server`);
    db.query(viewRoles, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            console.table(data);
            startMenu();
        }
    })};

const viewAllEmployees = () => {
    const startMenu = require(`../server`);
    db.query(viewAll, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            console.table(data);
            startMenu();
        }
    })
}

const viewAllDepartments = () => {
    const startMenu = require(`../server`);
    db.query(viewDepartments, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            console.table(data);
            startMenu();
        }
    })
}
module.exports = { addEmployee, viewAllRoles, viewAllEmployees, viewAllDepartments, updateRole, addRole };