import client from '../config/heroku';

client.query('CREATE TABLE users ( id INT PRIMARY KEY, name VARCHAR(20) )', (err, result) => {
  
});
