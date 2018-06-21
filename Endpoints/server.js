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

// Create a New Ride
app.post('/api/v1/rides', (req, res) => {
  if (!req.body.driver) {
    res.status(400).send('Enter valid driver\'s name');
  } else if (!req.body.location) {
    res.status(400).send('Enter valid location');
  } else if (!req.body.destination) {
    res.status(400).send('Enter valid destination');
  } else {
    const newRide = {
      id: rides.length + 1,
      driver: req.body.driver,
      location: req.body.location,
      destination: req.body.destination,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    rides.push(newRide);
    res.status(201).send(newRide);
  }
});

// GET - a specific ride offer
app.get('/api/v1/rides/:id', (req, res) => {
  const ride = rides.find(item => item.id === parseInt(req.params.id, 10));
  if (!ride) {
    res.status(404).send('Ride with ID NOT found');
  } else {
    res.send(ride);
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;

