import rides from '../models/rides';

const ridesController = {
  // Get all ride offer
  allRidesOffer: (req, res) => {
    res.json(rides);
  },

  // Create Ride offer
  createRideOffer: (req, res) => {
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
  },

  // Get a specific ride offer
  rideOffer: (req, res) => {
    const ride = rides.find(item => item.id === parseInt(req.params.id, 10));
    if (!ride) {
      res.status(404).send('Ride with ID NOT found');
    } else {
      res.send(ride);
    }
  },

  // POST - make request to join a ride offer
  joinRideOffer: (req, res) => {
    const ride = rides.find(item => item.id === parseInt(req.params.id, 10));
    if (!ride) {
      res.status(404).send('Ride with ID NOT found');
    } else {
      res.send(ride);
    }
  },

  // PUT - update a ride offer
  updateRideOffer: (req, res) => {
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
  },

  // Delete a ride offer
  deleteRideOffer: (req, res) => {
    const ride = rides.find(item => item.id === parseInt(req.params.id, 10));
    if (!ride) {
      res.status(404).send('Ride with given ID not found');
    } else {
      const position = rides.indexOf(ride);
      rides.splice(position);
      res.send(ride);
    }
  },
};

export default ridesController;
