const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  // res.send('Hello from Rylei\'s Sanctuary')
  res.render('index');
})
app.get('/contact', (req, res) => {
  res.render('contact');
})
app.get('/misc', (req, res) => {
  res.render('misc');
})
app.get('*', (req, res) => {
  res.send('You\'ve wondered off too far. Let\'s go back, shall we?')
})

app.listen(3000, () => {
  console.log('Serving on port 3000')
})