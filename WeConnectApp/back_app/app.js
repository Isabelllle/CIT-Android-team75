const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const volunteerRoutes = require('./routes/volunteer');  
const { client } = require('./db'); 

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the volunteer routes for anything starting with "/api/volunteer"
app.use('/api/volunteer', volunteerRoutes);  

// connect to PostgreSQL database
client.connect(err => {
    if (err) {
        console.error('Failed to connect to the database!', err.stack);
        process.exit(1); // Exit the process with an error code
    } else {
        console.log('Connected to the database.');

        // Start the server after the database connection is established
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } 
});

// Error handling middleware (as an example)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});