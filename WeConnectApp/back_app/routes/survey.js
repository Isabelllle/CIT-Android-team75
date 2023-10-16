const express = require('express');
const router = express.Router();
const { client } = require('../db'); 

console.log('Survey route file is loaded.');

// get selected questions
router.get('/questions', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // select from which page,default from first page
    const limit = parseInt(req.query.limit) || 1; // select how many questions each page,default each page 1 question
    const offset = (page - 1) * limit;

    try {
        const result = await client.query('SELECT * FROM public.questions ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
        console.log('Page:', page, 'Limit:', limit);
        console.log('Questions:', result.rows);
        console.log('Request URL:', req.originalUrl);
        console.log('Request Query Params:', req.query);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// submit response
router.post('/responses', async (req, res) => {
    console.log('Received a request to /responses'); 
    const responses = req.body.responses;  // Assume responses is an array of objects
    
    // verify
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
        return res.status(400).json({ message: "Responses are required" });
    }

    try {
        // 
        for (let response of responses) {
            const { question_id, vol_email, text, number, rating, rating1_10, yes_or_no, dropdown_id } = response;

            if (!question_id || !vol_email) {
                return res.status(400).json({ message: "Question ID and volunteer email are required" });
            }

            await client.query(
                'INSERT INTO public.responses (question_id, vol_email, sub_time, text, number, rating, rating1_10, yes_or_no, dropdown_id) VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6, $7, $8)',
                [question_id, vol_email, text, number, rating, rating1_10, yes_or_no, dropdown_id]
            );
        }

        res.status(201).json({ message: "Responses saved successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
console.log('Route for /responses is configured.');
module.exports = router;