import client from '../config/database';

const jwt = require('jsonwebtoken');

const usersController = {
  // Create Ride offer
  register: (req, res) => {
    if (!req.body.name) {
      res.status(400).send('Enter your full name');
    } else if (!req.body.email) {
      res.status(400).send('Enter valid email address');
    } else if (!req.body.phone) {
      res.status(400).send('Enter your phone number');
    } else if (!req.body.password) {
      res.status(400).send('Password is required');
    } else {
      client.query('INSERT INTO users(name, email, phone, password) values($1, $2, $3, $4)', [req.body.name, req.body.email, req.body.phone, req.body.password], (err, result) => {
        if (err) {
          res.status(400).send({ status: 'failed', data: [{ message: err }] });
        }
        res.status(201).send({ status: 'success', data: [{ message: 'User registered succesfully' }] });
      });
    }
  },

  login: (req, res) => {
    if (!req.body.email) {
      res.status(400).send('Enter vaild email address');
    } else if (!req.body.password) {
      res.status(400).send('Enter your password');
    } else {
      client.query('SELECT * FROM users WHERE email=($1) AND password=($2)', [req.body.email, req.body.password], (err, result) => {
        jwt.sign({ result }, 'secretkey', (err, token) => {
          res.json({ token });
        });
        if (err) {
          res.status(400).send({ status: 'failed', data: [{ message: err }] });
        } else if (result.rows.length < 1) {
          res.status(401).send({ status: 'failed', data: [{ message: 'Invalid username or password' }] });
          return false;
        }
        res.status(201).send({ status: 'success', data: [{ message: 'logged In' }] });
      });
    }
  },

  rideRequests: (req, res) => {
    client.query('SELECT * from requests', (err, result) => {
      if (err) {
        res.status(400).send({ status: 'failed', data: [{ message: err }] });
      }
      res.status(200).send({ status: 'success', data: { rides: result.rows } });
    });
  },

  requestStatus: (req, res) => {
    if (!req.params.rideId) {
      res.send('Ride with ID NOT found');
    } else {
      client.query('UPDATE requests SET status=($1) WHERE id=($2)', [req.body.status, req.params.id], (err, result) => {
        if (err) {
          res.status(400).send({ status: 'failed', data: [{ message: err }] });
        }
        res.status(200).send({ status: 'success', data: [{ message: 'Ride Updated Succesfully' }] });
      });
    }
  },
};

export default usersController;
