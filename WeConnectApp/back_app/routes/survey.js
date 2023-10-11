const express = require('express');
const router = express.Router();
const { client } = require('../db'); 

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
    const { question_id, volunteer_email, text, number, rating_1_5, rating1_10, y_n, dropdown_option_id } = req.body;
    
    // verify
    if (!question_id || !volunteer_email) {
        return res.status(400).json({ message: "Question ID and volunteer email are required" });
    }

    try {
        await client.query(
            'INSERT INTO public.responses (question_id, volunteer_email, text, number, rating_1_5, rating1_10, y_n, dropdown_option_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [question_id, volunteer_email, text, number, rating_1_5, rating1_10, y_n, dropdown_option_id]
        );
        res.status(201).json({ message: "Response saved successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;