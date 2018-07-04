import express from 'express';
import jwt from 'jsonwebtoken';
import ridesController from '../controllers/ridesController';

const ridesRoute = express.Router();

// route middleware to verify a token
ridesRoute.use((req, res, next) => {
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
    res.status(400).send({ success: false, message: 'No token provided.' });
  }
});

ridesRoute.get('/api/v1/rides', ridesController.allRidesOffer);
ridesRoute.post('/api/v1/rides', ridesController.createRideOffer);
ridesRoute.get('/api/v1/rides/:id', ridesController.rideOffer);
ridesRoute.post('/api/v1/rides/:id/requests', ridesController.joinRideOffer);

const routes = { ridesRoute };

export default routes;
