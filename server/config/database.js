const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'ride-my-way', 
  password: 'king@POSTGRES', 
  port: 5432, 
  max: 10,
  idleTimeoutMillis: 30000,
});

client.connect();

export default client;
