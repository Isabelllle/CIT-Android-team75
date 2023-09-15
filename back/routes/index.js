/**
 * Used to load and export other routing files.
 * 
 */

const express = require('express');
const router = express.Router();

// load other routing files
const questionsRouter = require('./questions');
const adminRouter = require('./admin');

// use other routers
router.use('/questions', questionsRouter);
router.use('/admin', adminRouter);

module.exports = {
    questionsRouter,
    adminRouter,
};
