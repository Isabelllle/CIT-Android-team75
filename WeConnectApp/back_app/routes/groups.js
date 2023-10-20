const express = require('express');
const router = express.Router();
const { client } = require('../db'); 

// get all groups
router.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM public.groups');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// add new group
router.post('/', async (req, res) => {
    const { group_name, has_registered, documentation, description } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO public.groups (group_name, has_registered, documentation, description) VALUES ($1, $2, $3, $4) RETURNING group_id',
            [group_name, has_registered, documentation, description]
        );
        res.status(201).json({ group_id: result.rows[0].group_id });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;