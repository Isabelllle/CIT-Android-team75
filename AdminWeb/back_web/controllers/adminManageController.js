/**
 * <Description> This is the controller about reminder lists' functions
 * @author {YIJUN GUO}
 * @version 2.0
 * @date {2023}/{Oct}/{9}
 * 
 */


// PostgreSQL client from PostgreSQL library.
const { client } = require('../db'); 
const nodemailer = require('nodemailer');
const path = require('path');



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
 * PUT /api/updateGroups
 * Updates group information (group names)
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */

async function updateGroups(req, res) {
    const { groups } = req.body;

    try {
        await client.query('BEGIN');

        // Get current group results from database
        const currentGroupResult = await client.query('SELECT group_name FROM groups');
        const currentGroups = currentGroupResult.rows.map(row => row.group_name);

        // Get groups to add and groups to delete
        const groupsToAdd = Array.isArray(groups) 
        ? groups.filter(group => !currentGroups.includes(group))
        : [];
        const groupsToDelete = Array.isArray(currentGroups) && Array.isArray(groups)
        ? currentGroups.filter(group => !groups.includes(group))
        : [];


        // Add groups
        for (const group of groupsToAdd) {
            await client.query('INSERT INTO groups (group_name) VALUES ($1)', [group]);
        }
        // Delete groups
        for (const group of groupsToDelete) {
            await client.query('DELETE FROM groups WHERE group_name = $1', [group]);
        }

        await client.query('COMMIT');

        res.json({ message: 'Groups updated successfully!' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error updating groups', error);
        res.status(500).json({ message: 'Internet server error' });
    }
}

// transport to email 
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 465, secure: true, // use SSL
    auth: {
        user: 'gyijun017@gmail.com', pass: 'bpyi tkkn ctfu kukr'
    }
});
  
/**
 * POST /api/sendEmail
 * send email when deal with different status
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

const sendEmail = (req, res) => {
    const { email, type } = req.body;

    let subject, text;

    if (type === 'approve') {
        subject = 'Registration Approved';
        text = "Congratulations! Your registration with WeConnect Admin Management System has been successfully approved. "
            + "We are pleased to welcome you as a valued member of our community.\n\n\n"
            + "So what's next?\n"
            + "Log in your account with email and password, and do further advanced operations.\n\n\n"
            + "If you have any questions or need assistance with any aspect of your registration, please do not hesitate to contact us via weconnect@volunteeringvictoria.org.";
    } else if (type === 'disapprove') {
        subject = 'Registration Disapproved';
        text = "Sorry, we regret to inform you that your registration with WeConnect Admin Management System has been disapproved.\n\n\n"
            + "We understand that this may be disappointing, and we would like to provide you with more information regarding the reasons for the disapproval. The decision may be due to one or more of the following reasons:\n"
            + "1. Incomplete Information: Your registration may not have been approved if essential information was missing or incomplete. Please ensure all required fields are properly filled out when reapplying.\n"
            + "2. Invalid Documentation: If certain documents or proof of eligibility were required, and they were either not provided or were not valid, this could lead to a disapproval.\n"
            + "3. Eligibility Criteria Not Met: Your registration might not align with the eligibility requirements set forth by our organization. Carefully review the eligibility criteria and ensure that you meet all the necessary qualifications.\n\n\n"
            + "If you believe there has been a mistake or if you have additional information to provide that could help us reconsider your registration, please feel free to contact our support team via weconnect@volunteeringvictoria.org.";
    } else {
        return res.status(400).send('Invalid request type');
    }



    const mailOptions = {
        from: 'gyijun017@gmail.com',
        to: email,
        subject: subject,
        text: text,
        attachments: [{
            filename: 'image.png',
            path: path.join(__dirname, '..', 'images', 'image.png'),
            cid: 'unique@nodemailer.com'
        }]
      };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Internal Server Error');
        } else {
          console.log('Email sent: ' + info.response);
          res.send('Email sent successfully');
        }
    });
};

/**
 * GET /api/searchGroupName
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

const searchGroupName = (req, res) => {
    const { searchGroup } = req.query;
    client.query('SELECT * FROM groups WHERE group_name = $1', [searchGroup], (error, result) => {
        if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
        return;
        }

        const searchData = result.rows.map(row => row.group_name);
        res.json(searchData);
    });
};

module.exports = {
    getUnregisterList,
    approveEmail,
    disapproveEmail,
    sendEmail,
    updateGroups,
    searchGroupName,
};