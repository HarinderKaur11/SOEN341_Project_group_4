'use strict';

var request = require('supertest');
var uuid    = require('uuid/v4');

describe('Testing routes and functionality', function () {
    var app,
        name,
        username,
        password,
        loggedInAgent;

    before(function () {
        app = require('../../app');
    });

    after(function (done) {
        app.close(done);
    });

    describe('general tests', function () {
        it('should respond to /', function (done) {
            request(app)
                .get('/')
                .expect(200, done);
        });

        it('should redirect to a 404 when going to non-existant path', function (done) {
            request(app)
                .get('/foo/bar')
                .expect(404, done);
        });

        it('should redirect us if we try to fetch authenticated files while unauthenticated', function (done) {
            request(app)
                .get('/authenticated/index.html')
                .expect(302, done);
        });
    });

    describe('register tests', function () {
        it('should have error checking when an invalid register request is made', function (done) {
            request(app)
                .post('/api/register')
                .expect(400, done);
        });

        it('should have working register functionality', function (done) {
            name = uuid();
            username = uuid();
            password = uuid();
            request(app)
                .post('/api/register')
                .send({ name: name, username: username, password: password })
                .expect(200, done);
        });

        it('should have error checking if the username already exists', function (done) {
            request(app)
                .post('/api/register')
                .send({ username: username, password: password })
                .expect(400, done);
        });
    });

    describe('login tests', function () {
        it('should give us a failed login attempt with a non-existant username', function (done) {
            request(app)
                .post('/api/login')
                .send({ username: 'ben', password: 'test' })
                .expect(401, done);
        });

        it('should give us a failed login attempt with an incorrect password', function (done) {
            request(app)
                .post('/api/login')
                .send({ username: username, password: 'test' })
                .expect(401, done);
        });

        it('should have working login functionality', function (done) {
            loggedInAgent = request.agent(app);
            loggedInAgent
                .post('/api/login')
                .send({ username: username, password: password })
                .expect(200, done);
        });

        it('should redirect me to the authenticated route if I am logged in', function (done) {
            loggedInAgent
                .get('/')
                .expect(302, done);
        });

        it('should fetch authenticated files properly', function (done) {
            loggedInAgent
                .get('/authenticated/index.html')
                .expect(200, done);
        });
    });

    describe('admin tests', function () {
        it('should allow me to change the type of the user', function (done) {
            loggedInAgent
                .post('/admin/setUserType')
                .send({ type: 'teacher', superSecretKey: 't12hisIs231MyS321uperSe32cretKey1235213' })
                .expect(200, done);
        });

        it('should have error checking for an invalid request', function (done) {
            loggedInAgent
                .post('/admin/setUserType')
                .send({ test: 'testing' })
                .expect(400, done);
        });
    });

    describe('course tests', function () {

    });

    describe('logout tests', function () {
        it('should have working logout functionality', function (done) {
            loggedInAgent
                .get('/api/logout')
                .expect(302, done);
        });
    });
});