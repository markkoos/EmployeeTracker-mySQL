const express = require(`express`);
const inquirer = require(`inquirer`);

// helper file with inquirer prompts and db queries
const { viewAllRoles, addEmployee } = require(`./helpers/inquirer`);

// Import console.table node module
const cTable = require(`console.table`);

// Import dotenv to have secure data
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Calls upon the inquirer prompts
const startMenu = () => {
    inquirer.prompt ([
        {
            type: `list`,
            message: `What would you like to do?`,
            name: `startChoice`,
            choices: [
                    `View All Employees`,
                    `Add Employee`,
                    `Update Employee Role`,
                    `View All Roles`,
                    `Add Role`,
                    `View All Departments`,
                    `Add Department`,
                ],
            },
        ])
    .then((answer) => {
            switch (answer.startChoice) {
                case `View All Employees`:
                    // Imported query for viewing all employees
                    viewAllRoles();
                    break;
                case `Add Employee`:
                    // Imported prompt and query for adding an employee
                    addEmployee();
                    break;
                case `Update Employee Role`:
                    // Imported prompt and query for updating an employee's role
                    console.log(`update employee role chosen`);
                    break;
                case `View All Roles`:
                    // Imported query to view all the roles
                    db.query(viewRoles, (error, data) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.table(data);
                        }
                    })
                    break;
                case `Add Role`:
                    // Imported prompt and query for adding a role
                    console.log(`add role chosen`);
                    break;                
                case `View All Departments`:
                    // Imported query for viewing all departments
                    db.query(viewDepartments, (error, data) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.table(data);
                        }
                    })
                    break;
                case `Add Department`:
                    // Imported prompt and query for adding a department
                    console.log(`Add Department chosen`);
                    break;            
                
            };
        })
}

startMenu();

// Default response for any other request 
app.use((req, res) => {
    res.status(404).end;
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = startMenu;