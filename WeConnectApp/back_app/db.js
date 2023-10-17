const { Client } = require('pg');

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