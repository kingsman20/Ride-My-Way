import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = require('chai');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsIm5hbWUiOiJNb2NoYSBDaGFpIiwiaWF0IjoxNTMzMTI5MTc4LCJleHAiOjE1MzMyMTU1Nzh9.4-OAGY6fF7gyRvZZuQFhSpxMqfGtHVC-WwTID-vnTbw';

const ridesTest = {
  getAllRides: () => {
    it('should return all rides', (done) => {
      chai.request(app)
        .get(`/api/v1/rides?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
        });
        done();
    });
  },

  getRidesFailed: () => {
    it('should not return all ride offer', (done) => {
      chai.request(app)
        .get('/api/v1/rides')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  },

  createRide: () => {
    it('should create a new ride offer', (done) => {
      const ride = {
        location: 'Yaba',
        destination: 'Ikoyi',
        date: '2018-02-03',
        time: '01:01',
        seats: 8,
      };
      chai.request(app)
        .post(`/api/v1/rides?token=${token}`)
        .send(ride)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
        });
        done();
    });
  },

  createRideFailedNoToken: () => {
    it('should not create a new ride', (done) => {
      chai.request(app)
        .post('/api/v1/rides')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          expect(res.body).to.have.property('message').eql('No token provided');
          done();
        });
    });
  },

  createRideFailedInvalidDetails: () => {
    it('should not post a new ride . Ride details not provided ', (done) => {
      chai.request(app)
        .post(`/api/v1/rides?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  },

  getRideOffer: () => {
    it('should get a specific ride offer', (done) => {
      chai.request(app)
        .get(`/api/v1/rides/130?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
        });
      done();
    });
  },

  invalidRideOfferId: () => {
    it('should not get any ride offer', (done) => {
      chai.request(app)
        .get(`/api/v1/rides/100000?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
        });
      done();
    });
  },
};

export default ridesTest;
