var request = require('supertest');

describe('loading express', function() {
    var server;

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
});