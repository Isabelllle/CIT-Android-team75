/**
 * This is Admin Login requirements.
 * 
 */
const jwt = require('jsonwebtoken');
const { client } = require('../db'); 
const { password } = require('pg/lib/defaults');
const titleMap = require('./map');



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
                            res.redirect('http://localhost:3000');
                        } else {
                            // console.log(`do this login`);
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


// vertify token
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


//get manager/admin name
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

//update user profile
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

//update user password
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



// 
const getTableData = (req, res) => {
    client.query('SELECT * FROM questions ORDER BY id ASC', (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        const tableData = result.rows;
        console.log(tableData); 
        res.json(tableData);
    });
}


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

const addTextQuestion = (req, res) => {
    const { selectedTitle, question, questionSecond } = req.body;

    const topic = titleMap.get(parseInt(selectedTitle));

    let in_second_survey;


    if(questionSecond !=  null) {
        in_second_survey = true;
    } else{
        in_second_survey = false;
    }

    client.query(
        'INSERT INTO questions (type, topic, question_first, in_second_survey, \
            question_second, rate_min, rate_max) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        ['Text', topic, question, in_second_survey, questionSecond, null, null],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'Question added successfully' });
        }
    );

}

const addYesNoQuestion = (req, res) => {
    const { selectedTitle, question, questionSecond } = req.body;

    const topic = titleMap.get(parseInt(selectedTitle));

    let in_second_survey;

    if(questionSecond !=  null) {
        in_second_survey = true;
    } else{
        in_second_survey = false;
    }

    client.query(
        'INSERT INTO questions (type, topic, question_first, in_second_survey, \
            question_second, rate_min, rate_max) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        ['Y/N', topic, question, in_second_survey, questionSecond, null, null],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'Question added successfully' });
        }
    );

}

const addNumQuestion = (req, res) => {
    const { selectedTitle, question, questionSecond } = req.body;

    const topic = titleMap.get(parseInt(selectedTitle));

    let in_second_survey;

    if(questionSecond !=  null) {
        in_second_survey = true;
    } else{
        in_second_survey = false;
    }

    client.query(
        'INSERT INTO questions (type, topic, question_first, in_second_survey, \
            question_second, rate_min, rate_max) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        ['Number', topic, question, in_second_survey, questionSecond, null, null],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'Question added successfully' });
        }
    );
}


module.exports = {
    loginAdmin,
    signupAdmin,
    getGroups,
    getUserName,
    verifyToken,
    updateUserInfo,
    updateUserPass,
    getTableData,
    deleteItem,
    addTextQuestion,
    addYesNoQuestion,
    addNumQuestion,
};