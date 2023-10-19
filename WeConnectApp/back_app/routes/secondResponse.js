const express = require('express');
const router = express.Router();
const { client } = require('../db'); 

console.log('Survey route file is loaded.');

// submit second response
router.post('/', async (req, res) => {
    console.log('Received a request to /second-responses'); 
    console.log('Request body:', JSON.stringify(req.body, null, 2));  

    const responses = req.body.responses;  // Assume responses is an array of objects
    
    // verify
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
        console.log('Invalid responses:', responses);  
        return res.status(400).json({ message: "Responses are required" });
    }

    try {
         
        for (let response of responses) {
            console.log('Processing response:', JSON.stringify(response, null, 2));  

            const { question_id, vol_email, text, number, rating, rating1_10, yes_or_no, dropdown_id } = response;

            if (!question_id || !vol_email) {
                console.log('Missing question ID or volunteer email:', response);  
                return res.status(400).json({ message: "Question ID and volunteer email are required" });
            }

            await client.query(
                'INSERT INTO public.responses (question_id, vol_email, sub_time, text, number, rating, rating1_10, yes_or_no, dropdown_id, first_response) VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6, $7, $8, false)',
                [question_id, vol_email, text, number, rating, rating1_10, yes_or_no, dropdown_id]
            );
        }

        console.log('Responses saved successfully.');  
        res.status(201).json({ message: "Responses saved successfully." });
    } catch (error) {
        console.error('Error occurred:', error);  
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


//  API to set sec_sub_time for a volunteer
router.post('/set-sec-sub-time', async (req, res) => {
    console.log('Received a request to /set-sec-sub-time'); 
    console.log('Request body:', JSON.stringify(req.body, null, 2));  

    const { email } = req.body;

    // Verify that email is provided
    if (!email) {
        console.log('Email is required.');  
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Update sec_sub_time in the database
        await client.query(
            'UPDATE public.volunteers SET sec_sub_time = CURRENT_DATE WHERE email = $1',
            [email]
        );

        console.log('sec_sub_time updated successfully for', email);  
        res.status(200).json({ message: "sec_sub_time updated successfully." });
    } catch (error) {
        console.error('Error occurred:', error);  
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

console.log('Route for /responses is configured.');
module.exports = router;