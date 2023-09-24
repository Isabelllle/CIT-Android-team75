/**
 * <Description> This is the controllers of all static pages (login/signup)
 * @author {YIJUN GUO}
 * @version 2.0
 * @date {2023}/{Sep}/{22}
 * 
 */

const path = require('path');

// display front-end login html 
const loginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../front_web/static/Views/log_in.html'));
}

// display front-end signup html 
const signinPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../front_web/static/Views/sign_in.html'));

}

// display front-end signup waiting html 
const signupWait = (req, res) => {
    res.sendFile(path.join(__dirname, '../../front_web/static/Views/AccountManage/sign_up_instruction.html'));
}

// display forget password -> enter email html
const forgetEnterEmail = (req, res) => {
    res.sendFile(path.join(__dirname, '../../front_web/static/Views/AccountManage/forgot_password_enter_email.html'));
}

// display forget password -> vertify user's indentifiaction (email) html
const forgetEmailVerify = (req, res) => {
    res.sendFile(path.join(__dirname, '../../front_web/static/Views/AccountManage/forgot_password_email_verify.html'));
}

// display forget password -> enter new password html
const newPassword = (req, res) => {
    res.sendFile(path.join(__dirname, '../../front_web/static/Views/AccountManage/forgot_password_new_password.html'));
}


module.exports = {
    loginPage,
    signinPage,
    signupWait,
    forgetEnterEmail,
    forgetEmailVerify,
    newPassword,
};