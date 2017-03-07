var passport   = require('passport');
var localStrat = require('passport-local').Strategy;
var bcrypt     = require('bcrypt');
var session     = require('express-session');

module.exports = function(app) {
    var sess   = {
        name: "ohIkgFh3KKxSS57",
        secret: "soen341",
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        },
        resave: true,
        saveUninitialized: false
    };

    app.use(session(sess));

    passport.use(new localStrat(
        function(username, password, done) {
            models.userModel.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }

                if (!user) {
                    return done(null, false, { message: 'Login attempt failed.' });
                }

                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Login attempt failed.' });
                }

                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());   

    return passport;
}