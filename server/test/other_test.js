import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = require('chai');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsIm5hbWUiOiJLaW5nc2xleSBNaWNoZWFsIiwiaWF0IjoxNTMyNTg4MjMzLCJleHAiOjE1MzI2NzQ2MzN9.4fsm4-pYRxkLaudPg3CQfIuPNFbVIqVFiKk6VKB67Ec';

const otherTest = {
  getUser: () => {
    it('should return the details of the current user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/21?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
          done();
        });
    });
  },

  getUserFailed: () => {
    it('should not return the details of the current user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/9000?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          done();
        });
    });
  },

  getUserRides: () => {
    it('should return rides a user created', (done) => {
      chai.request(app)
        .get(`/api/v1/users/rides?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
          done();
        });
    });
  },

  getUserRidesFailed: () => {
    it('should not return rides a user created', (done) => {
      chai.request(app)
        .get('/api/v1/users/rides')
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

  getNotifications: () => {
    it('should get notifications for a user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/requests/notification?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
          done();
        });
    });
  },

  getNotificationsFailed: () => {
    it('should fail in getting notifications', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/notification')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          done();
        });
    });
  },

  getRidesGiven: () => {
    it('should get rides given by a user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/rides/given?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
          done();
        });
    });
  },

  getRidesGivenFailed: () => {
    it('should not get rides given by a user', (done) => {
      chai.request(app)
        .get('/api/v1/users/rides/given')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          done();
        });
    });
  },

  getRidesTaken: () => {
    it('should get rides taken by a user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/rides/given?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
          done();
        });
    });
  },

  getRidesTakenFailed: () => {
    it('should not get rides taken by a user', (done) => {
      chai.request(app)
        .get('/api/v1/users/rides/given')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          done();
        });
    });
  },
};

export default otherTest;
