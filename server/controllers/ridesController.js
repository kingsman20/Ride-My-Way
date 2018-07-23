import client from '../config/database';

let search;
const ridesController = {
  // Get all ride offer
  allRidesOffer: (req, res) => {
    if (req.query.search) {
      search = req.query.search;
    } else {
      search = '';
    }
    client.query(`SELECT * from rides WHERE location like '%${search}%' or destination like '%${search}%'`, (err, result) => {
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
        client.query(`SELECT * FROM requests WHERE rideid=${req.params.id} AND userid=${req.decoded.id}`, (err, result) => {
          if (err) {
            res.status(500).send({ status: 'failed', message: 'An unknow error occurred. Try Again' });
          } else if (result.rows.length > 0) {
            res.status(400).send({ status: 'failed', message: 'You have already requested this ride. Please wait for responds' });
          } else {
            client.query('INSERT INTO requests(rideId, userId, status, location, destination, date, requester) values($1, $2, $3, $4, $5, $6, $7)', [req.params.id, req.decoded.id, 'Pending', req.body.location, req.body.destination, req.body.date, req.body.requester], (err, result) => {
              if (err) {
                res.status(500).send({ status: 'failed', message: 'An unknown error occurred. Try Again' });
              } else {
                res.status(200).send({ status: 'success', message: 'Ride requested succesfully' });
              }
            });
          }
        });
      }
    });
  },

  ridesGiven: (req, res) => {
    client.query(`SELECT * from rides where userid = ${req.decoded.id}`, (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows < 1) {
        res.status(200).send({ status: 'success', message: 'No rides given' });
      } else {
        res.status(200).send({ status: 'success', message: result.rows });
      }
    });
  },

  ridesTaken: (req, res) => {
    client.query(`SELECT * from requests where userid = ${req.decoded.id} AND status = 'Accepted'`, (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows < 1) {
        res.status(200).send({ status: 'success', message: 'No rides taken' });
      } else {
        res.status(200).send({ status: 'success', message: result.rows });
      }
    });
  },
};

export default ridesController;
