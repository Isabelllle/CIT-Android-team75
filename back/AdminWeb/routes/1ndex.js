/**
 * Used to load and export other routing files.
 * 
 */

const express = require('express');
const router = express.Router();

// load other routing files
const questionsRouter = require('./questions');
const loginRouter = require('./login');
const signinRouter = require('./signin');
const enterEmailRouter = require('./forgetEnterEmail');
const emailVerifyRouter = require('./forgetEmailVerify');
const passwordRouter = require('./newPassword');
const signInstructRouter = require('./signUpInstruct');


module.exports = {
    questionsRouter,
    loginRouter,
    signinRouter,
    enterEmailRouter,
    emailVerifyRouter,
    passwordRouter,
    signInstructRouter,
};
