/**
 * <Description> This is the controllers of login/signup functions & methods of profile settings
 *  Need token to vertify the indetification of users
 * @author {YIJUN GUO}
 * @version 3.0
 * @date {2023}/{Sep}/{19}
 * 
 */

// JSON Web Token library for generating and verifying tokens.
const jwt = require('jsonwebtoken');
// PostgreSQL client & default password value from PostgreSQL library.
const { client } = require('../db'); 
const { password } = require('pg/lib/defaults');


/**
 * POST static/login/submit
 * Handles the login request for an admin user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const loginAdmin = (req, res) => {  
    const { email, password } = req.body;
    
    // veritify the email & password
    client.query(
        'SELECT * FROM admin WHERE email = $1 AND password = $2 AND has_registered = true AND is_manager = false',
        [email, password],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length > 0) {
                // create an unique token for the user who login sucessfully
                const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
                res.redirect(`http://localhost:3000/?token=${token}`);
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
                            res.redirect('http://localhost:3000/?token=${token}');
                        } else {
                            res.send('Invalid username or password');
                        }
                    }
                );
            }
        }
    );
};

/**
 * POST static/signin/submit
 * Handles the signup request for an admin user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const signupAdmin = (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const selectedGroup = req.body.selected_group; // selected group name
    const has_registered = false; // default
    const is_manager = true; // default

    // find the group id of the group name to insert id in the admin table
    client.query('SELECT group_id FROM groups WHERE group_name = $1', [selectedGroup], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows.length > 0) {
            const group_id = results.rows[0].group_id;

            // insert signup information to the admin table
            client.query('INSERT INTO admin (email, password, "first_name ", "last_name ", has_registered, is_manager,\
                group_id, group_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
                [email, password, first_name, last_name, has_registered, is_manager, group_id, selectedGroup],
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.redirect(`/static/signUpInstruct`);
                });
        } else {
            res.status(400).send('Error: Group not found');
        }
    });

};

/**
 * GET static/signin/getGroups
 * Retrieves a list of groups from the database.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const getGroups = (req, res) => {
    client.query('SELECT * FROM groups', (error, results) => {
        if (error) {
            throw error;
        }
        const groups = results.rows.map(row => row.group_name); 
        res.json(groups);
    });
};


/**
 * GET /api/user
 * Verifies the token provided in the request headers.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }
        req.email = decoded.email; 
        req.userId = decoded.userId; 
        next();
    });
};


/**
 * GET /api/user
 * Retrieves the first and last name of the logged-in user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const getUserName = (req, res) => {
    const email = req.email;

    client.query(
        'SELECT "first_name ", "last_name ", password FROM admin WHERE email = $1',
        [email],
        (error, results) => {
            if (error) {
                throw error;
            }

            if (results.rows.length > 0) {
                const userData = {
                    firstName: results.rows[0]['first_name '],
                    lastName: results.rows[0]['last_name '],
                    password: results.rows[0][password],
                    email: email,
                };
                res.json(userData);
            }else {
                return res.json({});
            }
        }
    );
  };

/**
 * GET api/getIsManger
 * Find whether the user is admin or manager
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const getIsManger = (req, res) => {
    const email = req.email;

    client.query(
        'SELECT is_manager FROM admin WHERE email = $1',
        [email],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length > 0) {
                res.json(results);
            }else {
                return res.json({});
            }
        }
    );
};


/**
 * PUT /api/user
 * Updates user information (first name and last name and email)
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const updateUserInfo = (req, res) => {
    const { firstName, lastName, email } = req.body;
    client.query(
        'UPDATE admin SET "first_name " = $1, "last_name " = $2 WHERE email = $3',
        [firstName, lastName, email],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'User information updated successfully' });
        }
    );
};

/**
 * PUT /api/userspassword
 * Updates user password.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const updateUserPass = (req, res) => {
    const { oldpassword, password, email } = req.body;

    // Step 1: Check if the old password matches the one in the database
    client.query(
        'SELECT password FROM admin WHERE email = $1',
        [email],
        (error, results) => {
            if (error) {
                throw error;
            }

            if (results.rows.length > 0) {
                const storedPassword = results.rows[0].password;

                if (oldpassword !== storedPassword) {
                    return res.json({ success: false, message: 'Invalid password' });
                }

                // Step 2: Update the password if old password matches
                client.query(
                    'UPDATE admin SET password = $1 WHERE email = $2',
                    [password, email],
                    (error, results) => {
                        if (error) {
                            throw error;
                        }
                        res.json({ success: true, message: 'User information updated successfully' });
                    }
                );
            } else {
                return res.json({ success: false, message: 'User not found' });
            }
        }
    );
};


/**
 * GET /api/getSurveyQuesTable
 * Retrieves table data (questions) from the database.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const getSurveyQuesTable = (req, res) => {
    client.query('SELECT * FROM questions ORDER BY id ASC', (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        const tableData = result.rows;
        res.json(tableData);
    });
}


/**
 * DELETE /api/deleteItem/:id'
 * Deletes an item (question) with id from the database.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const deleteItem = (req, res) => {
    const itemId = req.params.id;

    client.query('DELETE FROM questions WHERE id = $1', [itemId], (error, result) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        if (result.rowCount === 0) {
          res.status(404).send('Item not found');
          return;
        }
    
        res.send('Item deleted successfully');
      });

}


module.exports = {
    loginAdmin,
    signupAdmin,
    getGroups,
    getUserName,
    verifyToken,
    updateUserInfo,
    updateUserPass,
    getSurveyQuesTable,
    deleteItem,
    getIsManger,
};