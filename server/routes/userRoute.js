import express from 'express';
import verify from '../middleware/verifyJwt';
import validate from '../middleware/validate';
import usersController from '../controllers/usersController';
import ridesController from '../controllers/ridesController';

const usersRoute = express.Router();

usersRoute.post('/api/v1/auth/signup', validate.validateRegister, usersController.register);
usersRoute.post('/api/v1/auth/login', validate.validateLogin, usersController.login);

// route middleware to verify a token
usersRoute.use(verify.jwt);

usersRoute.post('/api/v1/users/rides', validate.validateCreateRide, ridesController.createRideOffer);
usersRoute.get('/api/v1/users/rides/:id/requests', validate.validateGetRideRequests, usersController.rideRequests);
usersRoute.put('/api/v1/users/rides/:rideId/requests/:requestId', validate.validateRideResponse, usersController.requestStatus);

usersRoute.get('/api/v1/users/rides', usersController.getUserRides);
usersRoute.get('/api/v1/users/:userId', usersController.getUser);

const userRoutes = { usersRoute };

export default userRoutes;
