/**
 * <Description> This is the controller about reminder lists' functions
 * @author {YIJUN GUO}
 * @version 1.0
 * @date {2023}/{Oct}/{3}
 * 
 */


// PostgreSQL client from PostgreSQL library.
const { client } = require('../db'); 

/**
 * GET /api/getReminderList
 * Search reminder lists of all volunteers from database
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const getUnregisterList = (req, res) => {
    client.query('SELECT  "first_name ", "last_name ",email, group_name FROM \
    admin WHERE has_registered = false', (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows.length > 0) {
            const userDataArray = results.rows.map(row => ({
                firstName: row['first_name '],
                lastName: row['last_name '],
                email: row["email"],
                group_name: row["group_name"],
            }));
            res.json(userDataArray);
        }else {
            return res.json({});
        }
    });
}

/**
 * GET /api/approveEmail
 * approve email and change status in database
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const approveEmail = (req, res) => {
    const { email } = req.body;
    client.query(
        'UPDATE admin SET has_registered = true WHERE email = $1',
        [email],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'User information updated successfully' });
        }
    );
};

/**
 * GET /api/disapproveEmail
 * disapprove email and delete it in database
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const disapproveEmail = (req, res) => {
    const { email } = req.body;
    client.query(
        'DELETE FROM admin WHERE email = $1',
        [email],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'User information deleted successfully' });
        }
    );
};


/**
 * PUT /api/addGroup
 * Updates group information (group names)
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const addGroup = (req, res) => {
    const { addGroup } = req.body;
    console.log(addGroup);
    client.query(
        'INSERT INTO groups (description, group_name) VALUES ($1, $2)',
        [null, addGroup],
        (error, results) => {
            if (error) {
                throw error;
            }

            res.json({ success: true, message: 'Group added successfully' });
        }
    );
};

module.exports = {
    getUnregisterList,
    approveEmail,
    disapproveEmail,
    addGroup,
};