const chai = require('chai');
const { expect } = require('chai');

chai.use(require('chai-http'));
const should = chai.should();

const app = require('../app.js'); // Our app

describe('API Endpoint /rides', () => {
  // GET - return the home page
  it('should return the welcome page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  // GET - List all rides
  it('should return all rides', (done) => {
    chai.request(app)
      .get('/api/v1/rides?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjcyOTk3LCJleHAiOjE1MzA3NTkzOTd9.3BoBigJJGqeu3kn6WvXHl3A0xUhMFxNzdejh7vIOM0Y')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
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
      .post('/api/v1/rides?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjcyOTk3LCJleHAiOjE1MzA3NTkzOTd9.3BoBigJJGqeu3kn6WvXHl3A0xUhMFxNzdejh7vIOM0Y')
      .send(ride)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res).to.be.json;
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
      .post('/api/v1/rides?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjcyOTk3LCJleHAiOjE1MzA3NTkzOTd9.3BoBigJJGqeu3kn6WvXHl3A0xUhMFxNzdejh7vIOM0Y')
      .send(ride)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status').eql('failed');
        done();
    });
  });

  // GET - Get the details of a specific ride
  it('should get a specific ride offer', (done) => {
    chai.request(app)
      .get('/api/v1/rides/6?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjcyOTk3LCJleHAiOjE1MzA3NTkzOTd9.3BoBigJJGqeu3kn6WvXHl3A0xUhMFxNzdejh7vIOM0Y')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
      done();
  });

  // GET - fails to get a ride
  it('should not get any ride offer', (done) => {
    chai.request(app)
      .get('/api/v1/rides/100000?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjcyOTk3LCJleHAiOjE1MzA3NTkzOTd9.3BoBigJJGqeu3kn6WvXHl3A0xUhMFxNzdejh7vIOM0Y')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status').eql('failed');
      });
      done();
  });

  // POST - make a request to join a specific ride
  it('should make a request to join a ride offer', (done) => {
    chai.request(app)
      .post('/api/v1/rides/1/requests?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjcyOTk3LCJleHAiOjE1MzA3NTkzOTd9.3BoBigJJGqeu3kn6WvXHl3A0xUhMFxNzdejh7vIOM0Y')
      .send({ uid: 1 })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
      done();
  });

  // POST - make a request to join a specific ride
  it('should make fail in making request to join a ride', (done) => {
    chai.request(app)
      .post('/api/v1/rides/100000/requests')
      .end((err, res) => {
        res.should.have.status(403);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Login successful
  it('should login the user', (done) => {
    const user = {
      email: 'kingman@gmail.com',
      password: 'secret',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        res.body.should.have.property('token');
        res.body.should.have.property('status').eql('success');
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
      .end((err, res) => {
        res.should.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status').eql('failed');
      });
      done();
  });

  // Register  new user
  it('should create a new user', (done) => {
    const user = {
      name: 'Micheal Travis',
      email: 'npminstall@gmail.com',
      phone: '0930392893',
      password: 'password',
      confirm: 'password',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status').eql('success');
      });
      done();
  });

  // Registration failed
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
      .end((err, res) => {
        res.should.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('message').eql('Password do not match');
        done();
      });
  });

  // GET - Get the details of a specific ride
  it('should get all request for a ride offer', (done) => {
    chai.request(app)
      .get('/api/v1/users/rides/5/requests?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjcyOTk3LCJleHAiOjE1MzA3NTkzOTd9.3BoBigJJGqeu3kn6WvXHl3A0xUhMFxNzdejh7vIOM0Y')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
      done();
  });

  // GET - Fail in getting the requests for a specific ride
  it('should not get all request for a ride offer', (done) => {
    chai.request(app)
      .get('/api/v1/users/rides/5/requests')
      .end((err, res) => {
        res.should.have.status(403);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // PUT - respond to a ride offer
  it('should respond to a ride offer', (done) => {
    chai.request(app)
      .put('/api/v1/users/rides/5/requests/3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjcyOTk3LCJleHAiOjE1MzA3NTkzOTd9.3BoBigJJGqeu3kn6WvXHl3A0xUhMFxNzdejh7vIOM0Y')
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // PUT - fails in responding to a ride offer
  it('should fail in responding to a ride offer', (done) => {
    chai.request(app)
      .put('/api/v1/users/rides/5/requests/3')
      .end((err, res) => {
        res.should.have.status(403);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        done();
      });
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
