import rides from './rides';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// List of Routes
app.get('/', (req, res) => {
  res.send('Welcome to Ride-My-Way');
});

// Route to GET all Ride Offer
app.get('/api/v1/rides', (req, res) => {
  res.json(rides);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;

