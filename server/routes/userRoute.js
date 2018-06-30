import express from 'express';
import usersController from '../controllers/usersController';
import ridesController from '../controllers/ridesController';

const usersRoute = express.Router();

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send('Access denied');
  }
};

usersRoute.post('/api/v1/auth/signup', usersController.register);
usersRoute.post('/api/v1/auth/login', usersController.login);
usersRoute.post('/api/v1/users/rides', ridesController.createRideOffer);
usersRoute.get('/api/v1/users/rides/:id/requests', usersController.rideRequests);
usersRoute.put('/api/v1/users/rides/:rideId/requests/:requestId', usersController.requestStatus);

const userRoutes = { usersRoute };

export default userRoutes;
