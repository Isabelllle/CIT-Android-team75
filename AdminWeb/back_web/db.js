/**
 * <Description> This file create a new PostgreSQL client 
 * @author {JIELONG ZENG, YIJUN GUO}
 * @version 2.0
 * @date {2023}/{Sep}/{24}
 * 
 */

const { Client } = require('pg');

// Create a new PostgreSQL client instance
const client = new Client({
    user: 'postgres',
    host: 'database-1.cd8ghi8anexd.ap-southeast-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'Qezc5566',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});


module.exports = {
    client,
}
