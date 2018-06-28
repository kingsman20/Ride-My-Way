import express from 'express';
import ridesController from '../controllers/ridesController';

const ridesRoute = express.Router();

ridesRoute.get('/api/v1/rides', ridesController.allRidesOffer);
ridesRoute.post('/api/v1/rides', ridesController.createRideOffer);
ridesRoute.get('/api/v1/rides/:id', ridesController.rideOffer);
ridesRoute.put('/api/v1/rides/:id/requests', ridesController.joinRideOffer);
ridesRoute.put('/api/v1/rides/:id', ridesController.updateRideOffer);
ridesRoute.delete('/api/v1/rides/:id', ridesController.deleteRideOffer);

const routes = { ridesRoute };

export default routes;
