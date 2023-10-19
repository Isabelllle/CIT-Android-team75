const express = require('express');
const router = express.Router();
const { client } = require('../db'); 

router.get('/:questionId', async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const result = await client.query('SELECT option_id, option_value FROM dropdown_options WHERE question_id = $1', [questionId]);
        const options = result.rows;
        res.json(options.map(option => ({ id: option.option_id, optionValue: option.option_value })));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while fetching dropdown options');
    }
});

module.exports = router;