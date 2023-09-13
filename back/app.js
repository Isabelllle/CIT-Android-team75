/**
 * This file includes the main Express application file 
 * contains the server's configuration and middleware Settings
 */

const express = require('express');
const app = express();
const port = 3000;
const { client, createTables } = require('./db'); 
const { questionRouter, adminRouter } = require('./routes');

app.use(express.json());
app.use('/question', questionRouter);
app.use('/admin', adminRouter);

// connect to PostgreSQL database
client.connect(async err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected');
        await createTables();
    } 
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

