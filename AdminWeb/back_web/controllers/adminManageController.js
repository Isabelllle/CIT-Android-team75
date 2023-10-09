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


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'gyijun017@gmail.com', // 发送邮件的邮箱
//       pass: '20010422Gyj' // 发送邮件的邮箱密码或者授权码
//     }
//   });

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 465, secure: true, // use SSL
    auth: {
        user: 'gyijun017@gmail.com', pass: 'bpyi tkkn ctfu kukr'
    }
});
  
/**
 * POST /api/disapproveEmail
 * send email when deal with approved status
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
// const sendEmail = (req, res) => {
//     const { email } = req.body;

//     const mailOptions = {
//         from: 'gyijun017@gmail.com',
//         to: email,
//         subject: 'ApproveEmail',
//         text: 'Your email has been approved, please login.'
//       };
    
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error('Error sending email:', error);
//           res.status(500).send('Internal Server Error');
//         } else {
//           console.log('Email sent: ' + info.response);
//           res.send('Email sent successfully');
//         }
//     });
    
// };
const sendEmail = (req, res) => {
    const { email, type } = req.body; // 添加了一个名为 "type" 的字段

    let subject, text;

    if (type === 'approve') {
        subject = 'ApproveEmail';
        text = 'Your email has been approved, please login.';
    } else if (type === 'disapprove') {
        subject = 'DisapproveEmail';
        text = 'Your email has been disapproved, please contact support for more information.';
    } else {
        return res.status(400).send('Invalid request type'); // 如果类型不是 approve 或 disapprove，则返回错误响应
    }

    const mailOptions = {
        from: 'gyijun017@gmail.com',
        to: email,
        subject: subject,
        text: text
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


module.exports = {
    getUnregisterList,
    approveEmail,
    disapproveEmail,
    sendEmail,
    updateGroups,
};