import client from '../config/database';

const queryString = `
  CREATE TABLE IF NOT EXISTS rides (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL REFERENCES users(id),
    location VARCHAR(100) NOT NULL,
    destination VARCHAR(100),
    date DATE,
    time TIME(100),
    price SMALLINT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

client.query(queryString, (err, result) => { console.log(err, result); });
