var request = require('supertest');
var uuid    = require('uuid/v4');

describe('Testing routes, we', function() {
    var app;
    var username;
    var password;
    var cookies;
    var loggedInAgent;

    before(function() {
        app = require('../../app');
    });

    after(function(done) {
        app.close(done);
    });
  
    it('should respond to /', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
  
    it('should redirect to a 404 when going to non-existant path', function(done) {
        request(app)
            .get('/foo/bar')
            .expect(404, done);
    });

    it('should redirect us if we try to fetch authenticated files while unauthenticated', function(done) {
        request(app)
            .get('/authenticated/index.html')
            .expect(302, done);
    });

    it('should have error checking when an invalid register request is made', function(done) {
        request(app)
            .post('/register')
            .expect(400, done);
    });

    it('should have working register functionality', function(done) {
        username = uuid();
        password = uuid();
        request(app)
            .post('/register')
            .send({ username: username, password: password })
            .expect(200, done);
    });

    it('should have error checking if the username already exists', function(done) {
        request(app)
            .post('/register')
            .send({ username: username, password: password })
            .expect(400, done);
    });

    it('should give us a failed login attempt with a non-existant username', function(done) {
        request(app)
            .post('/login')
            .send({ username: 'ben', password: 'test' })
            .expect(401, done);
    });

    it('should give us a failed login attempt with an incorrect password', function(done) {
        request(app)
            .post('/login')
            .send({ username: username, password: 'test' })
            .expect(401, done);
    });

    it('should have working login functionality', function(done) {
        loggedInAgent = request.agent(app);
        loggedInAgent
            .post('/login')
            .send({ username: username, password: password })
            .expect(200, done);
    });

    it('should redirect me to the authenticated route if I am logged in', function(done) {
        loggedInAgent
            .get('/')
            .expect(302, done);
    });

    it('should fetch authenticated files properly', function(done) {
        loggedInAgent
            .get('/authenticated/index.html')
            .expect(200, done);
    });

    it('should have working logout functionality', function(done) {
        loggedInAgent
            .get('/logout')
            .expect(302, done);
    });
});