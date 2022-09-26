const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);

const startMenu = () => {
    inquirer.prompt (
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
    )
    .then((answer) => {
        switch (answer.startChoice) {
            case `View All Employees`:
                console.log(`view all employees chosen`);
                break;
            case `Add Employee`:
                console.log(`add employee chosen`);
                break;
            case `Update Employee Role`:
                console.log(`update employee role chosen`);
                break;
            case `View All Roles`:
                console.log(`view all roles chosen`);
                break;
            case `Add Role`:
                console.log(`add role chosen`);
                break;                
            case `View All Departments`:
                console.log(`view all departments chosen`);
                break;
            case `Add Department`:
                console.log(`Add Department chosen`);
                break;            
            
        };
        startMenu();
    })
}

module.exports = startMenu;