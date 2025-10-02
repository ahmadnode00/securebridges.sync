const nodemailer = require('nodemailer');

async function main() {
  // Add console output to verify if the script is running
  console.log('Script started...');

  const smtpHost = 'smtp.zoho.com';      // SMTP host for Zoho Mail
  const smtpPort = 465;                  // Port for SMTPS (SSL)
  const smtpUser = 'testfree2060@zohomail.com';  // Zoho SMTP username
  const smtpPass = 'Ibelieveinmyself100%';        // Zoho SMTP password (replace this with your actual password)

  console.log(`Trying to connect to SMTP: ${smtpHost}:${smtpPort}...`);

  // Create transporter object using Zoho Mail SMTP details
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,  // True for 465 (SMTPS, SSL)
    auth: { 
      user: smtpUser, 
      pass: smtpPass 
    },
    tls: { rejectUnauthorized: true }  // Secure connection (important in production)
  });

  // Verify connection and auth
  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP verified — ready to send (use dummy content only)');
  } catch (err) {
    console.error('SMTP verification failed:', err); // Will show any error in the console
    return;  // Exit if verification fails
  }

  // Send a safe demo email (no real secrets)
  const info = await transporter.sendMail({
    from: '"Demo" <testfree2060@zohomail.com>', // Sender address (use your Zoho email)
    to: 'testfree2060@zohomail.com',            // Recipient address (can be the same for testing)
    subject: 'SMTP demo (dummy message)',
    text: 'DEMO MESSAGE — no real secrets, used only for testing.'
  });

  // Log the result of sending the email
  console.log('Message sent:', info.response || info);
}

main().catch(err => {
  console.error('Error in main function:', err); // Catch and log any errors during execution
});
