import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/rideRoute';
import userRoute from './routes/userRoute';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = parseInt(process.env.PORT, 10) || 3000;

// List of Routes
app.get('/', (req, res) => {
  res.status(200).send({ status: 'success', message: 'Welcome to Ride-My-Way' });
});

// User Routes
app.use(userRoute.usersRoute);

// Ride Routes
app.use(routes.ridesRoute);

// Handle Invalid route
app.get('/*', (req, res) => {
  res.status(400).send({ status: 'failed', message: 'Invalid Route' });
});

app.listen(port);

module.exports = app;
