import express from 'express';
import ridesController from '../controllers/ridesController';

const ridesRoute = express.Router();

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

ridesRoute.get('/api/v1/rides', verifyToken, ridesController.allRidesOffer);
ridesRoute.post('/api/v1/rides', verifyToken, ridesController.createRideOffer);
ridesRoute.get('/api/v1/rides/:id', verifyToken, ridesController.rideOffer);
ridesRoute.put('/api/v1/rides/:id/requests', verifyToken, ridesController.joinRideOffer);
ridesRoute.put('/api/v1/rides/:id', verifyToken, ridesController.updateRideOffer);
ridesRoute.delete('/api/v1/rides/:id', verifyToken, ridesController.deleteRideOffer);

const routes = { ridesRoute };

export default routes;
