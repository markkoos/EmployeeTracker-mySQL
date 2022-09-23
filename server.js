const express = require(`express`);
// Import mysql2 node module
const mysql = require(`mysql2`);
// helper file with inquirer prompts
const startMenu = require(`./helpers/inquirer`);
// Import console.table node module
const cTable = require(`console.table`);
// Import dotenv to have secure data
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.json());
app.use(express.urlendcoded({ extended: false}));

// Connect to the database
const db = mysql.createConnection (
    {
        host: process.env.myHost,
        user: process.env.myUser,
        password: process.env.myPassword,
        database: process.env.myDatabase
    }
);


// Default response for any other request 
app.use((req, res) => {
    res.status(404).end;
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

startMenu();
