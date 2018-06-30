import express from 'express';
import jwt from 'jsonwebtoken';
import usersController from '../controllers/usersController';
import ridesController from '../controllers/ridesController';

const app = express();
const usersRoute = express.Router();

usersRoute.post('/api/v1/auth/signup', usersController.register);
usersRoute.post('/api/v1/auth/login', usersController.login);

// route middleware to verify a token
usersRoute.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {    
      if (err) {
        res.status(400).send({ success: false, message: 'Failed to authenticate token.' });   
      } else {
        req.decoded = decoded;  
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: 'No token provided.' });
  }
});


usersRoute.post('/api/v1/users/rides', ridesController.createRideOffer);
usersRoute.get('/api/v1/users/rides/:id/requests', usersController.rideRequests);
usersRoute.put('/api/v1/users/rides/:rideId/requests/:requestId', usersController.requestStatus);

const userRoutes = { usersRoute };

export default userRoutes;
