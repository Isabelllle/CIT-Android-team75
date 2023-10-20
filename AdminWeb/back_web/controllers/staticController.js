/**
 * <Description> This is the controllers of functions of static pages
 * @author {YIJUN GUO}
 * @version 1.0
 * @date {2023}/{Oct}/{17}
 * 
 */

/**
 * PUT /static/resetPassword
 * Reset user password.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */

// JSON Web Token library for generating and verifying tokens.
const jwt = require('jsonwebtoken');
const { client } = require('../db'); 

const resetPassword = (req, res) => {
    const { new_password } = req.body;
    const token = req.body.token;
    const email = verifyToken(req, res, token); 
    // Reset the password if old password matches
    client.query(
        'UPDATE admin SET password = $1 WHERE email = $2',
        [new_password, email], 
        (error, results) => {
            if (error) {
                throw error;
            }
            res.redirect(`https://weconnect-admin-06193c688dcf.herokuapp.com/static/login`);
        }
    );
};

const verifyToken = (req, res, token) => { 
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    return jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }
        return decoded.email; 
    });
};


module.exports = {
    resetPassword,
    verifyToken,
};