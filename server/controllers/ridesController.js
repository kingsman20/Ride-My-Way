import jwt from 'jsonwebtoken';
import client from '../config/database';

const ridesController = {
  // Get all ride offer
  allRidesOffer: (req, res) => {
    client.query('SELECT * from rides', (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows < 1) {
        res.status(200).send({ status: 'success', message: 'No Ride Available' });
      } else {
        res.status(200).send({ status: 'success', data: { rides: result.rows } });
      }
    });
  },

  // Create Ride offer
  createRideOffer: (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = jwt.decode(token);
    const userid = decoded.id;
    const creator = decoded.name;
    client.query('INSERT INTO rides(location, destination, date, time, price, userId) values($1, $2, $3, $4, $5, $6)', [req.body.location, req.body.destination, req.body.date, req.body.time, req.body.price, userid], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else {
        res.status(201).send({ status: 'success', message: 'Ride Offer Created Succesfully', data: {location: req.body.location, destination: req.body.destination, date: req.body.date, time: req.body.time, creator } });
      }
    });
  },

  // Get a specific ride offer
  rideOffer: (req, res) => {
    client.query('SELECT * FROM rides where id = $1', [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows < 1) {
        res.status(404).send({ status: 'failed', message: 'Ride does not exist' });
      } else {
        res.status(200).send({ status: 'success', data: result.rows });
      }
    });
  },

  // POST - make request to join a ride offer
  joinRideOffer: (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = jwt.decode(token);
    const userid = decoded.id;
    client.query('INSERT INTO requests(rideId, userId, status) values($1, $2, $3)', [req.params.id, userid, 'Requested'], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else {
        res.status(200).send({ status: 'success', message: 'Ride requested succesfully' });
      }
    });
  },
};

export default ridesController;
