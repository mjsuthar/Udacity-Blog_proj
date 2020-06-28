var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./server');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/Test')
    .expect(200, done);
  });
  
});