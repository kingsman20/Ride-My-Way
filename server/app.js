import routes from './routes/routes';
import userRoute from './routes/userRoute';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = parseInt(process.env.PORT, 10) || 3000;

// List of Routes
app.get('/', (req, res) => {
  res.send('Welcome to Ride-My-Way');
});

// Ride Routes
app.use(userRoute.usersRoute);

// User Routes
app.use(routes.ridesRoute);

// Handle Invalid route
app.get('/*', (req, res) => {
  res.send('Page NOT found');
});

app.listen(port);

module.exports = app;
