const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3030;

require("dotenv").config();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  // res.send('Hello from Rylei\'s Sanctuary')
  res.render('index');
})

// Contact Form
app.get('/contact', (req, res) => {
  res.render('contact');
})

app.post('/send', (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: req.body.EMAIL,
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  })
});

app.get('/misc', (req, res) => {
  res.render('misc');
})

app.get('*', (req, res) => {
  res.send('You\'ve wondered off too far. Let\'s go back, shall we?')
})

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`)
});
