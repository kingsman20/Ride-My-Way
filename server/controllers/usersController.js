import express from 'express';
import bcrypt from 'bcrypt';
import client from '../config/database';

const app = express();
const jwt = require('jsonwebtoken');

app.set('superSecret', process.env.SECRET);

const usersController = {
  // Create User
  register: (req, res) => {
    if (!req.body.name) {
      res.status(400).send({ status: 'failed', message: 'Enter your full name' });
    } else if (!req.body.email) {
      res.status(400).send({ status: 'failed', message: 'Enter valid email' });
    } else if (!req.body.phone) {
      res.status(400).send({ status: 'failed', message: 'Phone number is required' });
    } else if (!req.body.password || req.body.password.length < 6) {
      res.status(400).send({ status: 'failed', message: 'Password must not be less than six characters' });
    } else if (!req.body.confirm || req.body.password !== req.body.confirm) {
      res.status(400).send({ status: 'failed', message: 'Password do not match' });
    } else {
      client.query('SELECT * FROM users WHERE email=($1)', [req.body.email], (err, result) => {
        if (result.rows.length > 0) {
          res.status(400).send({ status: 'failed', message: 'Email already exist' });
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10);
          client.query('INSERT INTO users(name, email, phone, password) values($1, $2, $3, $4)', [req.body.name, req.body.email, req.body.phone, hash], (err, result) => {
            if (err) {
              res.status(400).send({ status: 'failed', message: 'Registration Failed' });
            } else {
              res.status(201).send({ status: 'success', message: 'User registered succesfully' });
            }
          });
        }
      });
    }
  },

  login: (req, res) => {
    if (!req.body.email) {
      res.status(400).send({ status: 'failed', message: 'Enter valid email address' });
    } else if (!req.body.password || req.body.password.length < 6) {
      res.status(400).send({ status: 'failed', message: 'Password must not be less than six characters' });
    } else {
      client.query('SELECT password, id FROM users WHERE email=($1)', [req.body.email], (err, result) => {
        if (err) {
          res.status(400).send({ status: 'failed', message: 'Login Failed' });
        } else {
          const hash = result.rows[0].password;
          const password = bcrypt.compareSync(req.body.password, hash);
          if (password) {
            const payload = {
              id: result.rows[0].id,
            };
            const token = jwt.sign(payload, app.get('superSecret'), {
              expiresIn: 1440, // expires in 24 mins
            });
            res.status(201).send({ status: 'success', message: 'Login Succesful', token });
          } else {
            res.status(201).send({ status: 'success', message: 'Invalid Username or password' });
          }
        }
      });
    }
  },

  // Get all requests for a ride offer
  rideRequests: (req, res) => {
    if (!req.params.id) {
      res.status(404).send({ status: 'failed', message: 'Invalid ID' });
    } else {
      client.query('SELECT * from requests where rideId=($1)', [req.params.id], (err, result) => {
        if (err) {
          res.status(400).send({ status: 'failed', message: err });
        } else if (result.rows < 1) {
          res.status(200).send({ status: 'failed', message: 'Requested ride ID does not exist' });
        } else {
          res.status(200).send({ status: 'success', data: result.rows });
        }
      });
    }
  },

  // Respond to Ride offer
  requestStatus: (req, res) => {
    if (!req.params.rideId) {
      res.status(200).send({ status: 'failed', message: 'Ride with ID not found' });
    } else if (!req.body.status) {
      res.status(200).send({ status: 'failed', message: 'Provide message status' });
    } else {
      client.query('UPDATE requests SET status=($1) WHERE rideId=($2) AND id=($3)', [req.body.status, req.params.rideId, req.params.id], (err, result) => {
        if (err) {
          res.status(400).send({ status: 'failed', message: err });
        }
        res.status(200).send({ status: 'success', message: 'Ride Updated Succesfully' });
      });
    }
  },
};

export default usersController;
