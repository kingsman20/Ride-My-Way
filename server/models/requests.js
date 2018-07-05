import client from '../config/database';

const queryString = `
  CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL REFERENCES users(id),
    rideid INTEGER NOT NULL REFERENCES rides(id),
    status VARCHAR(100),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

client.query(queryString, (err, result) => { console.log(err, result); });
