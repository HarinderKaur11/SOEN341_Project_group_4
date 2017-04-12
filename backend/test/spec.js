'use strict';

var request = require('supertest');
var uuid    = require('uuid/v4');

describe('Testing routes and functionality', function () {
    var app,
        name,
        nameTwo,
        username,
        usernameTwo,
        password,
        passwordTwo,
        loggedInAgent,
        loggedInAgentTwo,
        courseIdToJoin;

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

        it('should make another user for testing purposes', function (done) {
            nameTwo = uuid();
            usernameTwo = uuid();
            passwordTwo = uuid();

            request(app)
                .post('/api/register')
                .send({ name: nameTwo, username: usernameTwo, password: passwordTwo })
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

        it('should log in our second user', function (done) {
            loggedInAgentTwo = request.agent(app);
            loggedInAgentTwo
                .post('/api/login')
                .send({ username: usernameTwo, password: passwordTwo })
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

        it('should return the user type', function (done) {
            loggedInAgent
                .get('/api/getAccountType')
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

    describe('logout tests', function () {
        it('should have working logout functionality', function (done) {
            loggedInAgent
                .get('/api/logout')
                .expect(302, done);
        });

        it('should relog the user back in', function (done) {
            // Need to re-log the user for the changes on the user to propagate (i.e turning him into a teacher)
            loggedInAgent
                    .post('/api/login')
                    .send({ username: username, password: password })
                    .expect(200, done);
        });
    });

    describe('course tests', function () {
        describe('creating courses', function () {
            it('should allow a teacher create a course', function (done) {
                loggedInAgent
                    .post('/api/createCourse')
                    .send({ name: 'Biology', shortName: 'BIO 206' })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        courseIdToJoin = res.body.courses[0]._id;

                        done();
                    });
            });

            it('should have an error message for an invalid request', function (done) {
                loggedInAgent
                    .post('/api/createCourse')
                    .expect(400, done);
            });
        });

        describe('joining courses', function () {
            it('should allow a student to join a class', function (done) {
                loggedInAgentTwo
                    .post('/api/joinCourse')
                    .send({ courseId: courseIdToJoin })
                    .expect(200, done);
            });

            it('should return an error for an invalid request', function (done) {
                loggedInAgentTwo
                    .post('/api/joinCourse')
                    .expect(400, done);
            });

            it('should return an error when trying to join a non-existant course', function (done) {
                loggedInAgentTwo
                    .post('/api/joinCourse')
                    .send({ courseId: '1' })
                    .expect(400, done);
            });
        });

        describe('getting courses', function (done) {
            it('should return all available courses', function (done) {
                loggedInAgentTwo
                    .get('/api/getAllCourses')
                    .expect(200, done);
            });

            it('should return all of the courses for the current user', function (done) {
                loggedInAgentTwo
                    .get('/api/getMyCourses')
                    .expect(200, done);
            });
        });

        describe('leaving courses', function () {
            it('should allow a student to leave a class', function (done) {
                loggedInAgentTwo
                    .post('/api/leaveCourse')
                    .send({ courseId: courseIdToJoin })
                    .expect(200, done);
            });

            it('should return an error for an invalid request', function (done) {
                loggedInAgentTwo
                    .post('/api/leaveCourse')
                    .expect(400, done);
            });

            it('should rejoin the course for tests further down', function (done) {
                loggedInAgentTwo
                    .post('/api/joinCourse')
                    .send({ courseId: courseIdToJoin })
                    .expect(200, done);
            });
        });

        describe('delete courses', function () {
            it('should allow a teacher to delete their course', function (done) {
                loggedInAgent
                    .post('/api/deleteCourse')
                    .send({ courseId: courseIdToJoin })
                    .expect(200, done);
            });

            it('should return an error when given an invalid request', function (done) {
                loggedInAgent
                    .post('/api/deleteCourse')
                    .expect(400, done);
            });
        });
    });
});