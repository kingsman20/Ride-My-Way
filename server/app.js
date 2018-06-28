import routes from './routes/routes';

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = parseInt(process.env.PORT, 10) || 3000;

// List of Routes
app.get('/', (req, res) => {
  res.send('Welcome to Ride-My-Way');
});

// Ride Routes
app.use(routes.ridesRoute);

// User Authentication Route
app.post('/auth/login', (req, res) => {
  // mock user
  const user = {
    id: 1,
    username: 'king',
    email: 'king@gmail.com',
  }
  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({ token });
  });
});

// app.post('/post', verifyToken, (req, res) => {
//   res.json({ message: 'Post Received'});
// });

// verifytoken

// Handle Invalid route
app.get('/*', (req, res) => {
  res.send('Page NOT found');
});

app.listen(port);

module.exports = app;
