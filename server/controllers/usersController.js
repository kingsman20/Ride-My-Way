import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import client from '../config/database';

const app = express();

app.set('superSecret', process.env.SECRET);

const usersController = {
  // Create User
  register: (req, res) => {
    client.query('SELECT * FROM users WHERE email=($1)', [req.body.email], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: 'An error occurred. Try again' });
      } else if (result.rows.length > 0) {
        res.status(400).send({ status: 'failed', message: 'Email already exist' });
      } else {
        const hash = bcrypt.hashSync(req.body.password, 10);
        client.query('INSERT INTO users(name, email, phone, password) values($1, $2, $3, $4) RETURNING *', [req.body.name, req.body.email, req.body.phone, hash], (err, result) => {
          if (err) {
            res.status(500).send({ status: 'failed', message: 'Registration Failed' });
          } else {
            const payload = {
              id: result.rows[0].id,
              name: result.rows[0].name,
            };
            const token = jwt.sign(payload, app.get('superSecret'), {
              expiresIn: 86400, // expires in 24 hours
            });
            res.status(201).send({ status: 'success', message: 'User registered succesfully', token, data: { id: result.rows[0].id, name: result.rows[0].name, email: result.rows[0].email, phone: result.rows[0].phone } });
          }
        });
      }
    });
  },

  login: (req, res) => {
    client.query('SELECT * FROM users WHERE email=($1)', [req.body.email], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: 'Login failed. Try again' });
      } else if (result.rows < 1) {
        res.status(401).send({ status: 'failed', message: 'Invalid username or password' });
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
          res.status(200).send({ status: 'success', message: 'Login Succesful', token, data: { id: result.rows[0].id, name: result.rows[0].name, email: result.rows[0].email, phone: result.rows[0].phone } });
        } else {
          res.status(401).send({ status: 'failed', message: 'Invalid username or password' });
        }
      }
    });
  },

  // Get user details
  getUser: (req, res) => {
    const userid = parseInt(req.params.userId, 10);
    client.query(`SELECT name, email, phone from users where id=${userid}`, (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows < 1) {
        res.status(400).send({ status: 'failed', message: 'Invalid User' });
      } else {
        res.status(200).send({ status: 'success', data: result.rows });
      }
    });
  },

  // Get all rides a user created
  getUserRides: (req, res) => {
    const userid = parseInt(req.decoded.id, 10);
    client.query(`SELECT * from rides where userid=${userid}`, (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows < 1) {
        res.status(200).send({ status: 'failed', message: 'You have not created any ride offer' });
      } else {
        res.status(200).send({ status: 'success', data: result.rows });
      }
    });
  },

  // Get all rides a user created
  getNotification: (req, res) => {
    const userid = parseInt(req.decoded.id, 10);
    client.query(`SELECT * from requests where userid=${userid}`, (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows < 1) {
        res.status(200).send({ status: 'failed', message: 'No notifications' });
      } else {
        res.status(200).send({ status: 'success', data: result.rows });
      }
    });
  },

  // Get all requests for a ride offer you created
  rideRequests: (req, res) => {
    const userid = parseInt(req.decoded.id, 10);
    client.query(`select * from rides where id=${req.params.id} and userid=${userid}`, (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows < 1) {
        res.status(200).send({ status: 'failed', message: 'You have not created any ride offer' });
      } else {
        client.query(`SELECT * from requests where rideid=${req.params.id} AND status='Pending'`, (err, result) => {
          if (err) {
            res.status(500).send({ status: 'failed', message: err });
          } else if (result.rows < 1) {
            res.status(200).send({ status: 'failed', message: 'No pending requests for this ride' });
          } else {
            res.status(200).send({ status: 'success', data: result.rows });
          }
        });
      }
    });
  },

  // Respond to Ride offer
  requestStatus: (req, res) => {
    client.query('SELECT * FROM rides where id = ($1) AND userid=($2)', [req.params.rideId, req.decoded.id], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: 'An unknow error occurred. Try Again' });
      } else if (result.rows.length < 1) {
        res.status(400).send({ status: 'failed', message: 'You can\'t respond to this ride request' });
      } else {
        client.query('UPDATE requests SET status=($1) WHERE rideid=($2) AND id=($3) RETURNING * ', [req.body.status, parseInt(req.params.rideId, 10), parseInt(req.params.requestId, 10)], (err, result) => {
          if (err) {
            res.status(500).send({ status: 'failed', message: err });
          } else if (result.rows.length < 1) {
            res.status(404).send({ status: 'failed', message: 'Invalid ride or request id' });
          } else {
            res.status(200).send({ status: 'success', message: 'Responded to ride request succesfully' });
          }
        });
      }
    });
  },

  userProfile: (req, res) => {
    const userid = parseInt(req.decoded.id, 10);
    client.query('UPDATE users SET name=($1), email=($2), phone=($3), address=($4) WHERE id=($5) RETURNING * ', [req.body.name, req.body.email, req.body.phone, req.body.address, userid], (err, result) => {
      if (err) {
        res.status(500).send({ status: 'failed', message: err });
      } else if (result.rows.length < 1) {
        res.status(400).send({ status: 'failed', message: 'Update failed. Try Again' });
      } else {
        res.status(200).send({ status: 'success', message: 'Profile updated succesfully' });
      }
    });
  },
};

export default usersController;
