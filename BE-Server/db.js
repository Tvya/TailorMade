require('dotenv').config()
const Pool  = require('pg').Pool

const db = new Pool({
    user:"postgres",
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: "postgres"
});


module.exports = db