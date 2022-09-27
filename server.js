const express = require(`express`);
const inquirer = require(`inquirer`);

// node package to kill server port 
const kill = require(`kill-port`);

// helper file with inquirer prompts and db queries
const { viewAllRoles, addEmployee, viewAllEmployees, viewAllDepartments, updateRole, addRole } = require(`./helpers/inquirer`);

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
                    `Exit`
                ],
            },
        ])
    .then((answer) => {
            // IMPORTED QUERIES FOR EVERY CHOICE
            switch (answer.startChoice) {
                case `View All Employees`:
                    viewAllEmployees();
                    break;
                case `Add Employee`:
                    addEmployee();
                    break;
                case `Update Employee Role`:
                    updateRole();
                    break;
                case `View All Roles`:
                    viewAllRoles();
                    break;
                case `Add Role`:
                    // FUNCTION NOT DONE
                    addRole();
                    break;                
                case `View All Departments`:
                    viewAllDepartments();
                    break;
                case `Add Department`:
                    // FUNCTION NOT DONE
                    console.log(`Add Department chosen`);
                    break;            
                case `Exit`:
                    console.log(`Exiting program..`);
                    kill(PORT, `tcp`);
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