/**
 * This file is used to connect the database of postgreSQL
 * 
 */

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

const createTables = async () => {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS questions (
                id SERIAL PRIMARY KEY,
                type VARCHAR(50) NOT NULL,
                title VARCHAR(255) NOT NULL,
                question TEXT NOT NULL,
                rate_min INT,
                rate_max INT,
                question_number INT NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS answers (
                id SERIAL PRIMARY KEY,
                question_id INT REFERENCES questions(id),
                user_id INT,
                answer TEXT NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS dropdown_options (
                id SERIAL PRIMARY KEY,
                question_id INT REFERENCES questions(id),
                option_value TEXT NOT NULL
            );
        `);

        console.log("Tables created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

module.exports = {
    client,
    createTables,
}
