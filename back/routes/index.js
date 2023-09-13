/**
 * Used to load and export other routing files.
 * 
 */

const express = require('express');
const router = express.Router();

// load other routing files
const questionsRouter = require('./questions');
const adminRouter = require('./adm');

// use other routers
router.use('/questions', questionsRouter);

module.exports = {
    questionsRouter,
    adminRouter,
};
