import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = require('chai');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsIm5hbWUiOiJNb2NoYSBDaGFpIiwiaWF0IjoxNTMzMTI5MTc4LCJleHAiOjE1MzMyMTU1Nzh9.4-OAGY6fF7gyRvZZuQFhSpxMqfGtHVC-WwTID-vnTbw';

const requestsTest = {
  joinRideOffer: () => {
    it('should make a request to join a ride offer', (done) => {
      chai.request(app)
        .post(`/api/v1/rides/131/requests?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
        });
      done();
    });
  },

  requestRideFailedNoToken: () => {
    it('should not make request to join a ride', (done) => {
      chai.request(app)
        .post('/api/v1/rides/5/requests')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          done();
        });
    });
  },

  getRideRequests: () => {
    it('should get all request for a ride offer', (done) => {
      chai.request(app)
        .get(`/api/v1/users/rides/5/requests?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
        });
      done();
    });
  },

  getRequestsFailedNoToken: () => {
    it('should not get all request for a ride offer', (done) => {
      chai.request(app)
        .get('/api/v1/users/rides/5/requests')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          done();
        });
    });
  },

  respondToRequest: () => {
    it('should respond to a ride offer', (done) => {
      chai.request(app)
        .put(`/api/v1/users/rides/5/requests/3?token=${token}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  },

  respondFailedNoToken: () => {
    it('should fail in responding to a ride offer', (done) => {
      chai.request(app)
        .put('/api/v1/users/rides/5/requests/3')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  },
};

export default requestsTest;
