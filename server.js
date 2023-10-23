const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

require("dotenv").config();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Google OAuth2 
/* const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
)
oauth2Client.setCredentials({
  refresh_token:process.env.REFRESH_TOKEN
})
const accessToken = oauth2Client.getAccessToken(); */

// Routes
app.get('/', (req, res) => {
  res.render('index');
})

app.get('/projects', (req, res) => {
  res.render('projects');
})

app.get('/events', (req, res) => {
  res.render('events');
})

app.get('/music', (req, res) => {
  res.render('music');
})

app.get('/videos', (req, res) => {
  res.render('videos');
})

// Contact Form
app.route("/contact").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/contact.html");
});

app.post('/send', (req, res) => {
  const output = `
<p>You have a new contact request</p>
<h3>Contact details</h3>
<ul>
<li>Name: ${req.body.name}</li>
<li>Email: ${req.body.email}</li>
<li>Subject: ${req.body.subject}</li>
<li>Message: ${req.body.message}</li>
</ul>`
  
  /* const smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      }
    })
    
    const mailOpts = {
      from: `${req.body.name} <${req.body.email}>`,
      to: process.env.EMAIL,
      subject: `New message from ${req.body.name}`,
      html: output
    }
    smtpTrans.sendMail(mailOpts, (error, res) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: " + res.messageId);
        res.status(200).send(200)
      }
    })
    res.send(`Message sent! Let's head <a href="/contact.html">back</a>!`) */

}); 

app.get('/misc', (req, res) => {
  res.render('misc');
})

app.get('*', (req, res) => {
  res.send(`You've wondered off too far. Let's go <a href="/">back</a>, shall we?`)
})

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`)
})