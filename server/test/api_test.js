const chai = require('chai');
const { expect } = require('chai');

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API Endpoint /rides', () => {
  // GET - return the home page
  it('should return the welcome page', (done) => {
    chai.request(app)
      .get('/')
      .then((res) => {
        expect(res.body).to.be.an('object');
      });
    done();
  });

  // GET - List all rides
  it('should return all rides', (done) => {
    chai.request(app)
      .get('/api/v1/rides')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjA1MTIwLCJleHAiOjE1MzA2OTE1MjB9.ScqrFr586KCNPmEirCMKDuJHCUFci1QX_2LriT0lNsg')
      .then((res) => {
        expect(res.body).to.be.an('object');
      });
    done();
  });

  // POST - Create a new Ride
  it('should post a new ride', (done) => {
    const ride = {
      location: 'Yaba',
      destination: 'Ikoyi',
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      price: 2000
    };
    chai.request(app)
      .post('/api/v1/rides')
      .send(ride)
      .then((res) => {
        expect(res.body).to.be.an('object');
      });
      done();
  });

  // POST - Fail in creating
  it('should not create a new ride', (done) => {

    const ride = {
      location: 'Yaba',
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      price: 2000,
    };
    chai.request(app)
      .post('/api/v1/rides')
      .send(ride)
      .then((res) => {
        expect(res.body).to.be.an('object');
      });
      done();
  });

  // GET - Get the details of a specific ride
  it('should get a specific ride offer', (done) => {
    chai.request(app)
      .get('/api/v1/rides/1')
      .then((res) => {
        expect(res.body).to.be.an('object');  
      });
      done();
  });

  // POST - make a request to join a specific ride
  it('should make a request to join a ride offer', (done) => {
    chai.request(app)
      .put('/api/v1/rides/1/requests')
      .then((res) => {
        expect(res.body).to.be.an('object');
      });
      done();
  });

  // PUT - update a ride offer
  it('should update a ride offer', (done) => {
    const ride = {
      destination: 'Ikoyi',
    };
    chai.request(app)
      .put('/api/v1/rides/1')
      .send(ride)
      .then((res) => {
        expect(res.body).to.be.an('object');
      });
    done();
  });

  // Login successful
  it('should login the user', (done) => {
    const user = {
      email: 'kingsman@gmail.com',
      password: 'secret',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.be.json;
      });
    done();
  });

  // Login failed
  it('should return Invalid username or password', (done) => {
    const user = {
      email: 'kingsman@gmail.com',
      password: 'wrong_password',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.be.json;
        expect(res.body).to.have.a.property('message');
      });
    done();
  });

  // Register  new user
  it('should create a new user', (done) => {
    const user = {
      name: 'Micheal Brad',
      email: 'micheal@gmail.com',
      phone: '0930392893',
      password: 'password',
      confirm: 'password',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then((res) => {
        expect(res.body).to.be.an('object');
      });
      done();
  });

  // Register  new user
  it('should not create a user', (done) => {
    const user = {
      name: 'Micheal Brad',
      email: 'micheal@gmail.com',
      phone: '0930392893',
      password: 'password',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then((res) => {
        expect(res.body).to.be.an('object');
      });
      done();
  });

  // Invalid route
  it('should return Invalid route', (done) => {
    chai.request(app)
      .get('/*')
      .then((res) => {
        expect(res.body).to.be.an('object');
      });
    done();
  });
});
