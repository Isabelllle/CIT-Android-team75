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

module.exports = {
  loginAdmin,
};