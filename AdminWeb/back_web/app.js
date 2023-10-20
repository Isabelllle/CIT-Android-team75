/**
 * <Description> This file includes the main Express application file 
 * contains the server's configuration and middleware Settings
 * @author {YIJUN GUO}
 * @version 4.0
 * @date {2023}/{Sep}/{24}
 * 
 */

// Import necessary libraries
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Set the server port
const port = process.env.PORT || 3001;

// Import the database connection and table creation function
const { client, createTables } = require('./db'); 

// Import the router modules
const {  staticRouter, reactRouter, } = require('./routes/routerLists');

// Import body-parser for parsing request bodies, use body-parser to parse URL-encoded and JSON request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the built-in JSON parsing middleware in express
app.use(express.json());

// Set the static file directory to serve static resources
app.use(express.static(path.join(__dirname, 'static')));


// Call routers to run
app.use('/static', staticRouter);
app.use('/', reactRouter);

// connect to PostgreSQL database
client.connect(async err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected');
    } 
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});