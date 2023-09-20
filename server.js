const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  // res.send('Hello from Rylei\'s Sanctuary')
  res.render('index');
})

// Contact Form
app.get('/contact', (req, res) => {
  res.render('contact');
})
app.post('/contact', (req, res) => {
  res.render('contact');
})

app.get('/misc', (req, res) => {
  res.render('misc');
})

app.get('*', (req, res) => {
  res.send('You\'ve wondered off too far. Let\'s go back, shall we?');
})

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`)
});
