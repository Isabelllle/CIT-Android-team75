/**
 * This is Admin Login requirements.
 * 
 */


const { client } = require('../db'); 


const loginAdmin = (req, res) => {  
    const { email, password } = req.body;

    client.query(
        'SELECT * FROM admin WHERE email = $1 AND password = $2 AND has_registered = true AND is_manager = false',
        [email, password],
        (error, results) => {
            if (error) {
                throw error;
            }

            if (results.rows.length > 0) {
                res.send('Login successful');
            } else {
                // if not admin, just manager
                client.query(
                    'SELECT * FROM admin WHERE email = $1 AND password = $2 AND has_registered = true AND is_manager = true', 
                    [email, password], 
                    (error, managerResults) => {
                        if (error) {
                            throw error;
                        }
                
                        if (managerResults.rows.length > 0) {
                            res.send('Login successful for manager');
                        } else {
                            console.log(`do this login`);
                            res.send('Invalid username or password');
                        }
                    }
                );
            }
        }
    );
};

//deal with sign up requirements
const signupAdmin = (req, res) => {
    const { first_name, last_name, email, password, confirm_password} = req.body;
    const selectedGroup = req.body.selected_group;
    const has_registered = false; // default
    const is_manager = true; // default
    const group_id = 1; //random


    client.query('INSERT INTO admin (email, password, "first_name ", "last_name ", has_registered, is_manager,\
    group_id, group_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
    [email, password, first_name, last_name, has_registered, is_manager, group_id, selectedGroup],
      (error, results) => {
    if (error) {
        throw error;
    }
    res.send('Registration successful');
    });

};

// get organization list from database
const getGroups = (req, res) => {
    client.query('SELECT * FROM groups', (error, results) => {
        if (error) {
            throw error;
        }
        const groups = results.rows.map(row => row.group_name); 
        res.json(groups);
    });
};

module.exports = {
    loginAdmin,
    signupAdmin,
    getGroups,
};