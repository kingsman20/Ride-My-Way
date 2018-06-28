import rides from '../models/users';

const usersController = {
  // Create Ride offer
  createUser: (req, res) => {
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

  // POST - make request to join a ride offer
  login: (req, res) => {
    const ride = rides.find(item => item.id === parseInt(req.params.id, 10));
    if (!ride) {
      res.status(404).send('Ride with ID NOT found');
    } else {
      res.send(ride);
    }
  },
};

export default usersController;
