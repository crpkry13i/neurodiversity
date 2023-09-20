const express = require('express');
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8888;

require("dotenv").config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const transporter = nodemailer.createTransport({
  host: "smtp.live.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages")
  }
});

app.get('/', (req, res) => {
  // res.send('Hello from Rylei\'s Sanctuary')
  res.render('index');
})

// Contact Form
app.get('/contact', (req, res) => {
  res.render('contact');
})

app.post('/send', (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email sucessfully sent to recipient!")
      }
    });
  });
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
