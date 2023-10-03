const express = require('express');
const router = express.Router();
const { client } = require('../db');  

router.post('/report-error', async (req, res) => {
    const { email, errorDescription } = req.body;

    if (!email || !errorDescription) {
        return res.status(400).json({ error: 'Email and error description are required.' });
    }

    try {
        await client.query(
            'INSERT INTO error_reports (email, error_description) VALUES ($1, $2)', 
            [email, errorDescription]
        );
        res.json({ message: 'Error reported successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while reporting the error.' });
    }
});

module.exports = router;