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
});
