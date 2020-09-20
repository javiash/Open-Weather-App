const request = require('supertest');
const app = require('../app');

  describe('GET /location', function () {
    it('respond with json containing a the weather of your current location', function (done) {
        request(app)
            .get('/v1/location')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
  });

  describe('GET /current/:city', function () {
    it('respond with json containing a the weather of cordoba when passing it a parameter', function (done) {
        request(app)
            .get('/v1/current/cordoba')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
  });

  describe('GET /current/:city', function () {
    it('respond with json containing a the weather of current location when there are no parameters', function (done) {
        request(app)
            .get('/v1/current/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
  });

  describe('GET /current/:city', function () {
    it('respond with json containing an error', function (done) {
        request(app)
            .get('/v1/current/asfdsgsf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
  });

  describe('GET /forecast/:city', function () {
    it('respond with json containing a the weather of current location when there are no parameters', function (done) {
        request(app)
            .get('/v1/forecast/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
  });

  describe('GET /forecast/:city', function () {
    it('respond with json containing a the weather of Buenos Aires', function (done) {
        request(app)
            .get('/v1/forecast/buenos-aires')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
  });

  describe('GET /forecast/:city', function () {
    it('respond with json containing an error', function (done) {
        request(app)
            .get('/v1/forecast/asfdsgsf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
  });