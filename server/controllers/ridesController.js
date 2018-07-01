import jwt from 'jsonwebtoken';
import client from '../config/database';

const ridesController = {
  // Get all ride offer
  allRidesOffer: (req, res) => {
    client.query('SELECT * from rides', (err, result) => {
      if (err) {
        res.status(400).send({ status: 'failed', message: err });
      }
      res.status(200).send({ status: 'success', data: { rides: result.rows } });
    });
  },

  // Create Ride offer
  createRideOffer: (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = jwt.decode(token);
    const uid = decoded.id;
    if (!req.body.location) {
      res.status(400).send({ status: 'failed', message: 'Enter valid location' });
    } else if (!req.body.destination) {
      res.status(400).send({ status: 'failed', message: 'Enter valid destination' });
    } else if (!req.body.date) {
      res.status(400).send({ status: 'failed', message: 'Enter date of departure' });
    } else if (!req.body.time) {
      res.status(400).send({ status: 'failed', message: 'Enter time of departure' });
    } else if (!req.body.price) {
      res.status(400).send({ status: 'failed', message: 'Enter price' });
    } else {
      client.query('INSERT INTO rides(location, destination, date, time, price, userId) values($1, $2, $3, $4, $5, $6)', [req.body.location, req.body.destination, req.body.date, req.body.time, req.body.price, uid], (err, result) => {
        if (err) {
          res.status(400).send({ status: 'failed', message: err });
        }
        res.status(201).send({ status: 'success', message: 'Ride Offer Created Succesfully' });
      });
    }
  },

  // Get a specific ride offer
  rideOffer: (req, res) => {
    if (!req.params.id) {
      res.status(404).send('Enter a valid ID');
    } else {
      client.query('SELECT * FROM rides where id = $1', [req.params.id], (err, result) => {
        if (err) {
          res.status(400).send({ status: 'failed', message: err });
        } else if (result.rows < 1) {
          res.status(200).send({ status: 'failed', message: 'Ride does not exist' });
        } else {
          res.status(200).send({ status: 'success', data: result.rows });
        }
      });
    }
  },

  // POST - make request to join a ride offer
  joinRideOffer: (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = jwt.decode(token);
    const uid = decoded.id;
    client.query('INSERT INTO requests(rideId, userId, status) values($1, $2, $3)', [req.params.id, uid, 'Requested'], (err, result) => {
      if (err) {
        res.status(400).send({ status: 'failed', message: err });
      } else {
        res.status(200).send({ status: 'success', message: 'Ride requested succesfully' });
      }
    });
  },

  // PUT - update a ride offer
  updateRideOffer: (req, res) => {
    if (!req.params.id) {
      res.status(400).send({ status: 'failed', message: 'Ride does not exist' });
    } else {
      client.query('UPDATE rides SET location=($1), destination=($2), date=($3), time=($4), price=($5) WHERE id=($6)', [req.body.location, req.body.destination, req.body.date, req.body.time, req.body.price, req.params.id], (err, result) => {
        if (err) {
          res.status(400).send({ status: 'failed', message: err });
        } else {
          res.status(200).send({ status: 'success', message: 'Ride Updated Succesfully' });
        }
      });
    }
  },

  // Delete a ride offer
  deleteRideOffer: (req, res) => {
    if (!req.params.id) {
      res.status(400).send({ status: 'failed', message: 'Ride does not exist' });
    } else {
      client.query('DELETE FROM rides WHERE id=($1)', [req.params.id], (err, result) => {
        if (err) {
          res.status(400).send({ status: 'failed', message: err });
        } else {
          res.status(200).send({ status: 'success', message: 'Ride Deleted Succesfully' });
        }
      });
    }
  },
};

export default ridesController;
