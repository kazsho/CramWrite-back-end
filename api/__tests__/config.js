const { Pool } = require('pg');
const fs = require('fs');

require('dotenv').config()

const reset = fs.readFileSync(__dirname + '/reset.sql').toString();

const resetTestDB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = new Pool({
                connectionString: process.env.DB_TEST_URL
            });
            await db.query(reset).catch(err => console.log(err))
            db.end();
            resolve('Test DB Reset');
        } catch (err) {
            reject('Could not reset TestDB');
        }
    })
}

module.exports = { resetTestDB };