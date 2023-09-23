const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const surveyManageController = require('../controllers/surveyManageController');

router.get('/api/user', adminController.verifyToken, adminController.getUserName);
router.get('/api/getSurveyQuesTable', adminController.getTableData);

router.put('/api/users', adminController.updateUserInfo);
router.put('/api/userspassword', adminController.updateUserPass);
router.put('/api/addTextQuestion',adminController.addTextQuestion); 
router.put('/api/addYesNoQuestion',adminController.addYesNoQuestion);
router.put('/api/addNumQuestion',adminController.addNumQuestion);

router.put('/api/addRatingQuestion',surveyManageController.addRatingQuestion);
router.put('/api/addDropDownQuestion',surveyManageController.addDropDownQuestion);

router.delete('/api/deleteItem/:id', adminController.deleteItem);

module.exports = router;
