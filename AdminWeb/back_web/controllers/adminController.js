/**
 * <Description> This is the controllers of login/signup functions & methods of profile settings
 *  Need token to verify the identification of users
 * @author {YIJUN GUO, ZIXIAN LI}
 * @version 3.0
 * @date {2023}/{Sep}/{19}
 * 
 */

// JSON Web Token library for generating and verifying tokens.
const jwt = require('jsonwebtoken');
// PostgreSQL client & default password value from PostgreSQL library.
const { client } = require('../db'); 
const { password } = require('pg/lib/defaults');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');



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
    
    // verify the email & password
    client.query(
        'SELECT * FROM admin WHERE email = $1 AND password = $2 AND has_registered = true',
        [email, password],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length > 0) {
                const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });

                res.redirect(`http://localhost:3000/?token=${token}`);
            } else {
                res.redirect(`http://localhost:3001/static/login?error=invalid_password_or_email`);
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
    
    let token = uuidv4(); // 生成唯一的验证令牌

    // 保存令牌和用户信息，以便稍后验证
    client.query('INSERT INTO email_verification (email, first_name, last_name, password, token) VALUES ($1, $2, $3, $4, $5)', 
    [email, first_name, last_name, password, token]);

    sendVerificationEmail(email, first_name, token);
    verifyEmailToken(token, res, req);
};

// 调用此函数来发送验证邮件
function sendVerificationEmail(email, name, token) {
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // 如果是 true 则 port 设置为 465，如果是 false 则可以用其它端口
        auth: {
            user: 'gyijun017@gmail.com', // 发送邮件的邮箱
            pass: 'bpyi tkkn ctfu kukr' // 邮箱密码
            }
        });
    
    // 需要修改link
    const verificationLink = `http://localhost:3001/static/sign_up_instruction?token=${token}`;
    const mailOptions = {
        from: 'gyijun017@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Hello ${name},\n\nPlease verify your email address by clicking the following link:\n\n${verificationLink}\n\nThank you!`,
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        }
    });
}

/**
 * GET static/verify-email
 * Handles the login request for an admin user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const verifyEmailToken = (token, res, req) => {
    
    if (!token) {
        res.status(400).send('Missing verification token.');
        return;
    }
    verifyTokenSignUp(token, res, req);
};

function verifyTokenSignUp(token, res, req) {
    const { first_name, last_name, email, password } = req.body;
    const selectedGroup = req.body.selected_group; // selected group name
    const has_registered = false; // default
    const is_manager = true; // default

    client.query('SELECT * FROM email_verification WHERE token = $1', [token], (error, results) => {
        if (error) {
            throw error;
        }
        // find the group id of the group name to insert id in the admin table
        client.query('SELECT group_id FROM groups WHERE group_name = $1', [selectedGroup], (error, results) => {
            if (error) {
                throw error;
            }

            if (results.rows.length > 0) {
                const group_id = results.rows[0].group_id;

                // 将用户信息移动到主用户表
                client.query('INSERT INTO admin (email, password, "first_name ", "last_name ", has_registered, is_manager,\
                    group_id, group_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
                    [email, password, first_name, last_name, has_registered, is_manager, group_id, selectedGroup]);

                // 删除已验证的令牌和用户信息
                client.query('DELETE FROM email_verification WHERE token = $1', [token], (error, deleteResults) => {
                    if (error) {
                        console.error("Error deleting token:", error); // 添加详细的错误日志
                        return res.status(500).send('Internal Server Error');
                    }
                
                    if (deleteResults.rowCount === 0) {
                        console.warn("No matching token found for deletion"); // 如果没有匹配的令牌，添加警告日志
                        return res.status(400).send('Invalid Token');
                    }
                
                    // 如果一切正常，则重定向
                    return res.redirect('/static/email_verify');
                });
                
            // res.redirect('/static/signUpInstruct');
            } else {
                res.status(400).send('Invalid verification token');
            }
        });
    });
};


/**
 * GET static/signin/getGroups
 * GET /api/getGroups
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
    // console.log('Authorization Header:', req.headers.authorization); 
    // console.log('reminder vertifyqd', token);
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            // console.log('reminder vertify//', token);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.email = decoded.email; 
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
                res.json(results.rows[0].is_manager);
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
                    return res.json({ success: false, message: 'Invalid password', oldpassword, storedPassword});
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

    // Check if the item is a dropdown
    client.query('SELECT type FROM questions WHERE id = $1', [itemId], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        const itemType = result.rows[0].type;

        if (itemType === 'dropdown') {
            // Delete related dropdown options
            client.query('DELETE FROM dropdown_options WHERE question_id = $1', [itemId], (error, result) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                // Continue with deleting the question
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

                    res.send('Item and related dropdown options deleted successfully');
                });
            });
        } else {
            // Delete the question directly
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
    verifyEmailToken,
};