import config from '../config/database';

const pg = require('pg');

const pool = new pg.Pool(config);

const ridesController = {
  // Get all ride offer
  allRidesOffer: (req, res) => {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(400).send(err);
      }
      client.query('SELECT * from rides', (err, result) => {
        done();
        if (err) {
          res.status(400).send({ status: 'failed', data: [{ message: err }] });
        }
        res.status(200).send({ status: 'success', data: { rides: result.rows } });
      });
    });
  },

  // Create Ride offer
  createRideOffer: (req, res) => {
    if (!req.body.location) {
      res.status(400).send('Enter valid location');
    } else if (!req.body.destination) {
      res.status(400).send('Enter valid destination');
    } else if (!req.body.date) {
      res.status(400).send('Enter date of departure');
    } else if (!req.body.time) {
      res.status(400).send('Enter time of departure');
    } else if (!req.body.price) {
      res.status(400).send('Enter amount');
    } else {
      pool.connect((err, client, done) => {
        if (err) {
          res.status(400).send(err);
        }
        client.query('INSERT INTO rides(location, destination, date, time, price, userId) values($1, $2, $3, $4, $5, $6)', [req.body.location, req.body.destination, req.body.date, req.body.time, req.body.price, 1], (err, result) => {
          done();
          if (err) {
            res.status(400).send({ status: 'failed', data: [{ message: err }] });
          }
          res.status(200).send({ status: 'success', data: [{ message: 'Ride Offer Created Succesfully' }] });
        });
      });
    }
  },

  // Get a specific ride offer
  rideOffer: (req, res) => {
    if (!req.params.id) {
      res.status(404).send('Enter a valid ID');
    } else {
      pool.connect((err, client, done) => {
        if (err) {
          res.status(400).send(err);
        }
        client.query('SELECT * FROM rides where id = $1', [req.params.id], (err, result) => {
          done();
          if (err) {
            res.status(400).send({ status: 'failed', data: [{ message: err }] });
          }
          res.status(200).send({ status: 'success', data: { rides: result.rows } });
        });
      });
    }
  },

  // POST - make request to join a ride offer
  joinRideOffer: (req, res) => {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(400).send(err);
      }
      client.query('UPDATE rides SET requested=($1) WHERE id=($2)', [1, req.params.id], (err, result) => {
        done();
        if (err) {
          res.status(400).send({ status: 'failed', data: [{ message: err }] });
        }
        res.status(200).send({ status: 'success', data: [{ message: 'Ride Updated Succesfully' }] });
      });
    });
  },

  // PUT - update a ride offer
  updateRideOffer: (req, res) => {
    if (!req.params.id) {
      res.send('Ride with ID NOT found');
    } else {
      pool.connect((err, client, done) => {
        if (err) {
          res.status(400).send(err);
        }
        client.query('UPDATE rides SET location=($1), destination=($2), date=($3), time=($4), price=($5) WHERE id=($6)', [req.body.location, req.body.destination, req.body.date, req.body.time, req.body.price, req.params.id], (err, result) => {
          done();
          if (err) {
            res.status(400).send({ status: 'failed', data: [{ message: err }] });
          }
          res.status(200).send({ status: 'success', data: [{ message: 'Ride Updated Succesfully' }] });
        });
      });
    }
  },

  // Delete a ride offer
  deleteRideOffer: (req, res) => {
    if (!req.params.id) {
      res.status(404).send('Enter a valid ID');
    } else {
      pool.connect((err, client, done) => {
        if (err) {
          res.status(400).send(err);
        }
        client.query('DELETE FROM rides WHERE id=($1)', [req.params.id], (err, result) => {
          done();
          if (err) {
            res.status(400).send({ status: 'failed', data: [{ message: err }] });
          }
          res.status(200).send({ status: 'success', data: [{ message: 'Ride Deleted Succesfully' }] });
        });
      });
    }
  },
};

export default ridesController;
