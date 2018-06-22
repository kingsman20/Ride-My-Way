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
  } else if (!req.body.date) {
    res.status(400).send('Enter date of departure');
  } else if (!req.body.time) {
    res.status(400).send('Enter time of departure');
  } else {
    const newRide = {
      id: rides.length + 1,
      driver: req.body.driver,
      location: req.body.location,
      destination: req.body.destination,
      date: req.body.date,
      time: req.body.time,
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

// POST - make request to join a ride offer
app.post('/api/v1/rides/:id/requests', (req, res) => {
  const ride = rides.find(item => item.id === parseInt(req.params.id, 10));
  if (!ride) {
    res.status(404).send('Ride with ID NOT found');
  } else {
    res.send(ride);
  }
});

// PUT - update a ride offer
app.put('/api/v1/rides/:id', (req, res) => {
  const ride = rides.find(item => item.id === parseInt(req.params.id, 10));
  if (!ride) {
    res.send('Ride with ID NOT found');
  } else {
    if (req.body.driver) {
      ride.driver = req.body.driver;
    }
    if (req.body.location) {
      ride.location = req.body.location;
    }
    if (req.body.destination) {
      ride.destination = req.body.destination;
    }
    res.send(ride);
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;

