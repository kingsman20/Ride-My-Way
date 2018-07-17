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
    client.query('INSERT INTO rides(location, destination, date, time, price, userId) values($1, $2, $3, $4, $5, $6) RETURNING *', [req.body.location, req.body.destination, req.body.date, req.body.time, req.body.seats, req.decoded.id], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else {
        res.status(201).send({ status: 'success', message: 'Ride Offer Created Succesfully', data: { id: result.rows[0].id, location: result.rows[0].location, destination: result.rows[0].destination, date: result.rows[0].date, time: result.rows[0].time, creator_id: req.decoded.id, creator_name: req.decoded.name } });
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
    client.query('SELECT * FROM rides where id = ($1) AND userid=($2)', [req.params.id, req.decoded.id], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: 'An unknow error occurred. Try Again' });
      } else if (result.rows.length > 0) {
        res.status(400).send({ status: 'failed', message: 'You can\'t request a ride you created' });
      } else {
        client.query('INSERT INTO requests(rideId, userId, status) values($1, $2, $3)', [req.params.id, req.decoded.id, 'Requested'], (err, result) => {
          if (err) {
            res.status(500).send({ status: 'failed', message: 'An unknown error occurred. Try Again' });
          } else {
            res.status(200).send({ status: 'success', message: 'Ride requested succesfully' });
          }
        });
      }
    });
  },
};

export default ridesController;
