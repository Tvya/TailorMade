require('dotenv').config()
const Pool  = require('pg').Pool

const db = new Pool({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DB
});


module.exports = db