const express = require('express');
const router = express.Router();
const { client } = require('../db'); 

// API to add volunteer details
router.post('/volunteerDetails', (req, res) => {
    console.log('Request body:', req.body);  // 

    // 
    const { firstName, lastName, email, postcode } = req.body;
    const managerEmail = req.body.managerEmail || null;
    const club = req.body.club || 'DefaultClub'; 

    client.query(
        'INSERT INTO volunteers ("first_name", "last_name", email, "manager_email", "group_name", "postcode", "first_sub_time", "fcm_token") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
        [firstName, lastName, email, managerEmail, club, postcode, new Date(), fcmToken], 
        (error, results) => {
            if (error) {
                console.error('Database error:', error);  
                return res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
            res.status(201).json({ message: "Volunteer details added successfully!" });
        }
    );
});

// API to update FCM token
router.post('/update-fcm-token', async (req, res) => {
    const { email, fcmToken } = req.body;

    if (!email || !fcmToken) {
        return res.status(400).json({ error: 'Email and FCM token are required.' });
    }

    try {
        await client.query('UPDATE public.volunteers SET fcm_token = $1 WHERE email = $2', [fcmToken, email]);
        res.json({ message: 'FCM token updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the FCM token.' });
    }
});

module.exports = router;
