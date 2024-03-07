const { Pool } = require("pg");
require('dotenv').config();

if(process.env.NODE_ENV === "test") {
    const db = new Pool({
        connectionString: process.env.DB_TEST_URL
    })

    module.exports = db;
} else {
    const db = new Pool({
        connectionString: process.env.DB_URL
    })

    module.exports = db;
}

console.log("DB connection established.")