require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB, 
  password: process.env.DB_PASS, 
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
});

client.connect();

export default client;
