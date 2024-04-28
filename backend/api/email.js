const nodemailer = require('nodemailer');
const router = require('express').Router();

// Create a Nodemailer transporter using MailCatcher's SMTP server
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025, // MailCatcher's SMTP port
});

router.post('/reset-password', async (req, res) => {
  const { role, email } = req.body;

  const mailOptions = {
    from: 'info@health-app.com',
    to: email,
    subject: 'Reset password',
    text: 'Here is a link to reset your password: https://health-app.com/reset/',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent from ' + info.messageId + ' to ' + email);
    res.json({ message: 'Reset password mail sent.' });
  } catch (error) {
    console.error('Error while sending mail:', error);
    res.status(500).json({ error: 'Mail could not be sent.' });
  }
});

router.post('/doctor/send-mail', async (req, res) => {
  const { mailText, doctorMail, patientsMail, mailSubject } = req.body;
  let successCount = 0;
  let errorCount = 0;

  // Iterate through each patient's email and send an email
  for (const patientEmail of patientsMail) {
    const mailOptions = {
      from: doctorMail,
      to: patientEmail, // Use the current patient's email
      subject: mailSubject,
      text: mailText, // Use the provided mailText or customize the message here
    };

    try {
      // Send an email to the current patient
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent from ' + info.messageId + ' to ' + patientEmail);
      successCount++;
    } catch (error) {
      console.error('Error while sending mail to ' + patientEmail + ':', error);
      errorCount++;
      // If sending email fails for a patient, you may handle it here
    }
  }

  // Send a single response after all emails have been processed
  res.json({
    message: 'Emails sent to patients.',
    success: successCount,
    error: errorCount,
  });
});

module.exports = router;
