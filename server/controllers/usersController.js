import express from 'express';
import bcrypt from 'bcrypt';
import client from '../config/database';

const app = express();
const jwt = require('jsonwebtoken');

app.set('superSecret', process.env.SECRET);

const usersController = {
  // Create User
  register: (req, res) => {
    client.query('SELECT * FROM users WHERE email=($1)', [req.body.email], (err, result) => {
      if (result.rows.length > 0) {
        res.status(400).send({ status: 'failed', message: 'Email already exist' });
      } else {
        const hash = bcrypt.hashSync(req.body.password, 10);
        client.query('INSERT INTO users(name, email, phone, password) values($1, $2, $3, $4)', [req.body.name, req.body.email, req.body.phone, hash], (err, result) => {
          if (err) {
            res.status(500).send({ status: 'failed', message: 'Registration Failed' });
          } else {
            res.status(200).send({ status: 'success', message: 'User registered succesfully', user: { name: req.body.name, email: req.body.email, phone: req.body.phone } });
          }
        });
      }
    });
  },

  login: (req, res) => {
    client.query('SELECT name, password, id FROM users WHERE email=($1)', [req.body.email], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: 'Login Failed' });
      } else if (result.rows < 1) {
        res.status(400).send({ status: 'failed', message: 'Invalid Username or password' });
      } else {
        const hash = result.rows[0].password;
        const password = bcrypt.compareSync(req.body.password, hash);
        if (password) {
          const payload = {
            id: result.rows[0].id,
            name: result.rows[0].name,
          };
          const token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: 86400, // expires in 24 hours
          });
          res.status(200).send({ status: 'success', message: 'Login Succesful', token });
        } else {
          res.status(401).send({ status: 'failed', message: 'Invalid Username or password' });
        }
      }
    });
  },

  // Get all requests for a ride offer you created
  rideRequests: (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = jwt.decode(token);
    const userid = decoded.id;
    client.query('SELECT * from requests where rideId=($1) AND userid=($2)', [req.params.id, userid], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows < 1) {
        res.status(400).send({ status: 'failed', message: 'No requests for the ride with this id' });
      } else {
        res.status(200).send({ status: 'success', data: result.rows });
      }
    });
  },

  // Respond to Ride offer
  requestStatus: (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = jwt.decode(token);
    const userid = decoded.id;
    client.query('SELECT * FROM requests where rideid = ($1) AND userid=($2)', [req.params.rideId, userid], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: 'An unknow error occurred. Try Again' });
      } else if (result.rows.length < 0) {
        res.status(400).send({ status: 'failed', message: 'You can\'t respond to this ride request' });
      } else {
        client.query('UPDATE requests SET status=($1) WHERE rideId=($2) AND id=($3)', [req.body.status, req.params.rideId, req.params.requestid], (err, result) => {
          if (err) {
            res.status(500).send({ status: 'failed', message: err });
          } else {
            res.status(200).send({ status: 'success', message: 'Responded to ride request succesfully' });
          }
        });
      }
    });
  },
};

export default usersController;
