/**
 * This file includes the main Express application file 
 * contains the server's configuration and middleware Settings
 */


const express = require('express');
const cors = require('cors');
const app = express();
 

app.use(cors());
const port = 3001;
const { client, createTables } = require('./db'); 
const { questionsRouter, loginRouter, signinRouter, enterEmailRouter, 
    emailVerifyRouter, passwordRouter, signInstructRouter, getUserName } = require('./routes/1ndex');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const path = require('path');

app.use(express.json());
app.use('/questions', questionsRouter);

app.use(express.static(path.join(__dirname, '../front_web/static')));
app.use('/login',loginRouter);
app.use('/signin',signinRouter);
app.use('/enteremail', enterEmailRouter);
app.use('/emailverify', emailVerifyRouter);
app.use('/newpassword', passwordRouter);
app.use('/signupinstruction', signInstructRouter);
app.use('/', getUserName);


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