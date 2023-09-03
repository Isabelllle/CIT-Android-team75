const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(express.json());

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

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
});

app.post('/edit-questions', (req, res) => {
    const { id, text } = req.body;
    client.query('UPDATE questions SET text = $1 WHERE id = $2', [text, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});