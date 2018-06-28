const chai = require('chai');
const { expect } = require('chai');

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API Endpoint /rides', () => {
  // GET - List all rides
  it('should return all rides', () => {
    return chai.request(app)
      .get('/api/v1/rides')
      .then((res) => {
        // expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  // POST - Create a new Ride
  it('should post a new ride', () => {
    const ride = {
      location: 'Yaba',
      destination: 'Ikoyi',
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      price: 2000
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

  // GET - Get the details of a specific ride
  it('should get a specific ride offer', () => {
    return chai.request(app)
      .get('/api/v1/rides/1')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');      });
  });

  // POST - make a request to join a specific ride
  it('should make a request to join a ride offer', (done) => {
    chai.request(app)
      .put('/api/v1/rides/1/requests')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // PUT - update a ride offer
  it('should update a ride offer', () => {
    const ride = {
      destination: 'Ikoyi',
    };
    return chai.request(app)
      .put('/api/v1/rides/1')
      .send(ride)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });
});