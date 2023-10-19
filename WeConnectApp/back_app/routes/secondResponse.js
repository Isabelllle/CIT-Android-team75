const express = require('express');
const router = express.Router();
const { client } = require('../db'); 

console.log('Survey route file is loaded.');

// submit second response
router.post('/second-responses', async (req, res) => {
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

console.log('Route for /responses is configured.');
module.exports = router;