var request = require('supertest');
var uuid    = require('uuid/v4');

describe('Testing all routes', function() {
    var server;
    var username;
    var password;

    before(function() {
        server = require('../../app');
    });

    after(function(done) {
        server.close(done);
    });
  
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
  
    it('404 when going to non-existant path', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });

    it('has working register functionality', function(done) {
        username = uuid();
        password = uuid();
        request(server)
            .post('/register', {
                username: username,
                password: password
            })
            .expect(200, done);
    });

    it('has working login functionality', function(done) {
        request(server)
            .post('/login', {
                username: username,
                password: password
            })
            .expect(200, done);
    });

    it('has working logout functionality', function(done) {
        request(server)
            .post('/logout', {
                
            })
            .expect(200, done);
    });
});