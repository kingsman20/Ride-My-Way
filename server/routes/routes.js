import express from 'express';
import ridesController from '../controllers/ridesController';

const ridesRoute = express.Router();

// Rides routes
ridesRoute.get('/', (req, res) => {
  res.send('Welcome to Ride-My-Way');
});

ridesRoute.get('/api/v1/rides', ridesController.allRidesOffer);
ridesRoute.post('/api/v1/rides', ridesController.createRidesOffer);
ridesRoute.get('/api/v1/rides/:id', ridesController.rideOffer);
ridesRoute.post('/api/v1/rides/:id/requests', ridesController.joinRideOffer);
ridesRoute.put('/api/v1/rides/:id', ridesController.updateRideOffer);
ridesRoute.delete('/api/v1/rides/:id', ridesController.deleteRideOffer);

// Handle Invalid route
ridesRoute.get('/*', (req, res) => {
  res.status(404).send('Page NOT found');
});

const routes = { ridesRoute };

export default routes;
