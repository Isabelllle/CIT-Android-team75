/**
 * This is Admin Login requirements.
 * 
 */


const { client } = require('../db'); 

// deal with Admin log in requirements
const loginAdmin = (req, res) => {  
    const {username, password} = req.body;

    client.query('SELECT * FROM admin WHERE username = $1 AND password = $2', [username, password], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows.length > 0) {
            res.send('Login successful');
          } else {
            res.send('Invalid username or password');
          }
        });
};

//deal with sign up requirements
const signupAdmin = (req, res) => {
    const { firstName, lastName, email, question } = req.body;

    client.query('INSERT INTO admin (first_name, last_name, email, group) VALUES ($1, $2, $3, $4)', [firstName, lastName, email, group], (error, results) => {
    if (error) {
        throw error;
    }

    res.send('Registration successful');
    });

};

module.exports = {
    loginAdmin,
    signupAdmin,
};