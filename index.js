// Import mysql2 node module
const mysql = require(`mysql2`);
// helper file with inquirer prompts
const startMenu = require(`./helpers/inquirer`);
// Import console.table node module
const cTable = require(`console.table`);

// const db = mysql.createConnection (
//     {
//         host: `localhost`,
//         user: `root`,
//         password: `Grill12g!`,
//         database: ``
//     }
// );

startMenu();
