var request = require('supertest');
var uuid    = require('uuid/v4');

describe('Testing routes, we', function() {
    var server;
    var username;
    var password;

    before(function() {
        server = require('../../app');
    });

    after(function(done) {
        server.close(done);
    });
  
    it('respond to /', function(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
  
    it('redirect to a 404 when going to non-existant path', function(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });

    it('have working register functionality', function(done) {
        username = uuid();
        password = uuid();
        request(server)
            .post('/register', {
                username: username,
                password: password
            })
            .expect(200, done);
    });

    it('have working login functionality', function(done) {
        request(server)
            .post('/login', {
                username: username,
                password: password
            })
            .expect(200, done);
    });

    it('have working logout functionality', function(done) {
        request(server)
            .get('/logout')
            .expect(302, done);
    });
});