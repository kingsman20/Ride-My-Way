import rides from './../rides';

const chai = require('chai');
const { expect } = require('chai');

chai.use(require('chai-http'));

const app = require('../server.js'); // Our app

describe('API Endpoint /rides', () => {
  // GET - List all rides
  it('should return all rides', (done) => {
    chai.request(app)
      .get('/api/v1/rides')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // POST - Create a new Ride
  it('should post a new ride', () => {
    const ride = {
      id: rides.length + 1,
      driver: 'Paul Freddy',
      location: 'Yaba',
      destination: 'Ikoyi',
      date: new Date(),
      time: new Date().toLocaleTimeString(),
    };
    return chai.request(app)
      .post('/api/v1/rides')
      .send(ride)
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });
});
