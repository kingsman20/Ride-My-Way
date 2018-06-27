import routes from './routes/routes';

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = parseInt(process.env.PORT, 10) || 3000;

const connectionString = 'postgres://postgres:king@POSTGRES@localhost:58007/ride-my-way';
// List of Routes
app.get('/', (req, res) => {
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      console.log('not able to get connection '+ err);
      res.status(400).send(err);
    }
    client.query('SELECT * FROM users', (err, result) => {
      done(); // closing the connection;
        if(err){
          console.log(err);
          res.status(400).send(err);
        }
    res.status(200).send(result.rows);
  });
});
  // res.send('Welcome to Ride-My-Way');
});

// Ride Routes
app.use(routes.ridesRoute);

// Handle Invalid route
app.get('/*', (req, res) => {
  res.send('Page NOT found');
});

app.listen(port);

module.exports = app;
