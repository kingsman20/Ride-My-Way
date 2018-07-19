import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const expect = require('chai').expect;

describe('API Endpoint /rides', () => {
  // GET - return the home page
  it('should return the welcome page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
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
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('status').eql('success');
      });
      done();
  });

  // GET - List all rides
  it('should return all rides', (done) => {
    chai.request(app)
      .get('/api/v1/rides?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJUcmF2aXMgTm9kZWpzIiwiaWF0IjoxNTMyMDI2NDc0LCJleHAiOjE1MzIxMTI4NzR9.Qjz7XvxkolGKy1x21ar6WjZMi-v9tCXuIOn_3KqOnBc')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
      done();
  });

  // GET - List all rides
  it('should not return all rides', (done) => {
    chai.request(app)
      .get('/api/v1/rides')
      .end((err, res) => {
        expect(res).to.have.status(401);
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
      date: '2018-02-03',
      time: '01:01',
      seats: 8,
    };
    chai.request(app)
      .post('/api/v1/rides?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJUcmF2aXMgTm9kZWpzIiwiaWF0IjoxNTMyMDI2NDc0LCJleHAiOjE1MzIxMTI4NzR9.Qjz7XvxkolGKy1x21ar6WjZMi-v9tCXuIOn_3KqOnBc')
      .send(ride)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('success');
      });
    done();
  });

  it('should not post a new ride', (done) => {
    chai.request(app)
      .post('/api/v1/rides')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('should not post a new ride . Ride details not provided ', (done) => {
    chai.request(app)
      .post('/api/v1/rides?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJUcmF2aXMgTm9kZWpzIiwiaWF0IjoxNTMyMDI2NDc0LCJleHAiOjE1MzIxMTI4NzR9.Qjz7XvxkolGKy1x21ar6WjZMi-v9tCXuIOn_3KqOnBc')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
    done();
  });

  // POST - Fail in creating
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

  // GET - Get the details of a specific ride
  it('should get a specific ride offer', (done) => {
    chai.request(app)
      .get('/api/v1/rides/6?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJUcmF2aXMgTm9kZWpzIiwiaWF0IjoxNTMyMDI2NDc0LCJleHAiOjE1MzIxMTI4NzR9.Qjz7XvxkolGKy1x21ar6WjZMi-v9tCXuIOn_3KqOnBc')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('success');
      });
      done();
  });

  // POST - make a request to join a specific ride
  it('should not make request to join a ride', (done) => {
    chai.request(app)
      .post('/api/v1/rides/100000/requests')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('failed');
        done();
      });
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
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('failed');
      });
      done();
  });

  // Register  new user
  it('should create a new user', (done) => {
    const user = {
      name: 'Micheal Travis',
      email: 'npminstallfisl@gmail.com',
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
      });
      done();
  });

  // Registration failed
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

  // GET - Get the details of a specific ride
  it('should get all request for a ride offer', (done) => {
    chai.request(app)
      .get('/api/v1/users/rides/5/requests?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJUcmF2aXMgTm9kZWpzIiwiaWF0IjoxNTMyMDI2NDc0LCJleHAiOjE1MzIxMTI4NzR9.Qjz7XvxkolGKy1x21ar6WjZMi-v9tCXuIOn_3KqOnBc')
      .end((err, res) => {
        expect(res).to.have.status(201);
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
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // PUT - respond to a ride offer
  it('should respond to a ride offer', (done) => {
    chai.request(app)
      .put('/api/v1/users/rides/5/requests/3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJUcmF2aXMgTm9kZWpzIiwiaWF0IjoxNTMyMDI2NDc0LCJleHAiOjE1MzIxMTI4NzR9.Qjz7XvxkolGKy1x21ar6WjZMi-v9tCXuIOn_3KqOnBc')
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
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // POST - make a request to join a specific ride
  it('should make a request to join a ride offer', (done) => {
    chai.request(app)
      .post('/api/v1/rides/1/requests?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJUcmF2aXMgTm9kZWpzIiwiaWF0IjoxNTMyMDI2NDc0LCJleHAiOjE1MzIxMTI4NzR9.Qjz7XvxkolGKy1x21ar6WjZMi-v9tCXuIOn_3KqOnBc')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
    done();
  });

  // GET - fails to get a ride
  it('should not get any ride offer', (done) => {
    chai.request(app)
      .get('/api/v1/rides/100000?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJUcmF2aXMgTm9kZWpzIiwiaWF0IjoxNTMyMDI2NDc0LCJleHAiOjE1MzIxMTI4NzR9.Qjz7XvxkolGKy1x21ar6WjZMi-v9tCXuIOn_3KqOnBc')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('failed');
      });
      done();
  });

  // Invalid route
  it('should return Invalid route', (done) => {
    chai.request(app)
      .get('/*')
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('failed');
        expect(res.body).to.have.property('message').eql('Invalid Route');
      });
    done();
  });
});
