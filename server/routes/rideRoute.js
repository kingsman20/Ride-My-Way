import express from 'express';
import verify from '../middleware/verifyJwt';
import validate from '../middleware/validate';
import ridesController from '../controllers/ridesController';

const ridesRoute = express.Router();

// route middleware to verify a token
ridesRoute.use(verify.jwt);

ridesRoute.get('/api/v1/rides', ridesController.allRidesOffer);
ridesRoute.post('/api/v1/rides', validate.validateCreateRide, ridesController.createRideOffer);
ridesRoute.get('/api/v1/rides/:id', validate.validateGetRide, ridesController.rideOffer);
ridesRoute.post('/api/v1/rides/:id/requests', ridesController.joinRideOffer);

const rideRoute = { ridesRoute };

export default rideRoute;
