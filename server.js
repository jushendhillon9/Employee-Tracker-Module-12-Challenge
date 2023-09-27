const mysql = require('mysql2/promise');
require("dotenv").config();


async function createConnection() {
    const db = await mysql.createConnection(
        {
            host: "localhost",
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        }
    )
    return db;
}


module.exports = createConnection;