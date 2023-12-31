const express = require('express');
const router = express.Router();
const nodeCron = require('node-cron');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const { client } = require('../db');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gmail@gmail.com', 
    pass: 'password' 
  }
});

// set up timing task
nodeCron.schedule('0 17 * * 5', async () => { 
  const currentDateWithoutTime = new Date();
  currentDateWithoutTime.setHours(0,0,0,0);

  const { rows: volunteers } = await client.query('SELECT * FROM public.volunteers');

  volunteers.forEach(async volunteer => {
    const secondSurveyStartTime = new Date(volunteer.first_sub_time); 
    secondSurveyStartTime.setMonth(secondSurveyStartTime.getMonth() + 2);

    if (currentDateWithoutTime >= secondSurveyStartTime && !volunteer.sec_sub_time) {
      sendPushNotification(volunteer);
      sendEmailNotification(volunteer.email, 'It’s time for the second survey!');

      if (volunteer.manager_email) {
        sendEmailNotification(volunteer.manager_email, `${volunteer.first_name} ${volunteer.last_name} is due for the second survey.`);
      }
    }
  });
});

function sendPushNotification(volunteer) {
    // check whether token exist
    if (!volunteer.fcm_token) {
      console.log(`No FCM token found for volunteer ${volunteer.first_name} ${volunteer.last_name}.`);
      return;
    }
  
    const message = {
      notification: {
        title: 'Survey Reminder',
        body: 'It’s time for the second survey!'
      },
      token: volunteer.fcm_token  // get token from database
    };
  
    // use Firebase Admin SDK send push notification
    admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }

// send gmail notification
async function sendEmailNotification(email, message) {
  const mailOptions = {
    from: '@gmail.com', 
    to: email,
    subject: 'Survey Notification',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

router.get('/test-push', (req, res) => {
    const volunteer = {
        fcm_token: 'dV3gV8h4RfSfcpdBWBi5Ri:APA91bHEb6VuJfLFJ4sFRx-yCGTEhPTHhXYcq97ngvswfZ1Vs06jJnn6y_AeL4Teu9dcwNZzoI8bUkw1cDmoH6X8lpLztBrhl5Cq953XPAu94Rg8izVw2n5lGX4S0dpqs8ut0Uo2VUQ0',

        first_name: 'Test',
        last_name: 'User'
    };
    
    sendPushNotification(volunteer);
    res.send('Push notification sent');
});

module.exports = router;

module.exports = router;