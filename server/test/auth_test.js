import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = require('chai');

const authTest = {
  homepage: () => {
    it('should return the welcome page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
          done();
        });
    });
  },

  createUser: () => {
    it('should create a new user', (done) => {
      const user = {
        name: 'Node Travis',
        email: 'nodetravis3@gmail.co',
        phone: '09303928939',
        password: 'password',
        confirm: 'password',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
          done();
        });
    });
  },

  createFailedEmailExist: () => {
    it('should not create a new user, email exist', (done) => {
      const user = {
        name: 'Node Travis',
        email: 'mocha@gmail.com',
        phone: '09303928939',
        password: 'password',
        confirm: 'password',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          done();
        });
    });
  },

  createFailedInvalidPhone: () => {
    it('should not create a user', (done) => {
      const user = {
        name: 'Micheal Brad',
        email: 'michealn@gmail.com',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          expect(res.body).to.have.property('message').eql('Provide a valid phone number e.g 08012345678');
          done();
        });
    });
  },

  loginUser: () => {
    it('should login the user', (done) => {
      const user = {
        email: 'mocha@gmail.com',
        password: 'secret',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('status').eql('success');
          done();
        });
    });
  },

  loginFailed: () => {
    it('should return Invalid username or password', (done) => {
      const user = {
        email: 'mocha@gmail.com',
        password: 'wrong_password',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          done();
        });
    });
  },

  invalidRoute: () => {
    it('should return Invalid route', (done) => {
      chai.request(app)
        .get('/*')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('failed');
          done();
        });
    });
  },
};

export default authTest;
