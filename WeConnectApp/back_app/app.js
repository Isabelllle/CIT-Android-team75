/**
 * This file includes the main Express application file 
 * contains the server's configuration and middleware Settings
 */

const express = require('express');
const app = express();
const port = 8000;
const { client } = require('./db'); 


//app.use(express.static('path_to_your_xml_files'));

// app.get('/your_route', (req, res) => {
//     res.send('Response from server');
//   });
  
app.get('/', (req, res) =>{
    
    res.send('page successful');
});

// connect to PostgreSQL database
client.connect(async err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected');
    } 
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});