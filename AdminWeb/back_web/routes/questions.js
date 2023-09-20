/**
 * This is the file Contains routing and 
 * handling functions related to the problem
 */

const express = require('express');
const router = express.Router();
const { client } = require('../db'); 

router.get('/get-questions', (req, res) => {
    client.query('SELECT * FROM questions', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(result.rows);
        }
    });
});

router.post('/edit-questions', (req, res) => {
    const { id, type, title, question, rate_min, rate_max, question_number } = req.body;
    
    client.query('UPDATE questions SET type = $1, title = $2, question = $3, rate_min = $4, rate_max = $5, question_number = $6 WHERE id = $7', 
                 [type, title, question, rate_min, rate_max, question_number, id], 
                 (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.json({ success: true });
                    }
                });
});

module.exports = router;