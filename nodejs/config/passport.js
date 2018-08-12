// config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User       = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    passport.use('local-registro',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
    function(req,email,password,done){
        User.findOne({'local.email':email},function(err,user){
            if(err){return done(err);}
            if(user){
                return done(null,false,req.flash('signupMessage','El correo ya se encuentra registrado'));
            } else {
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err){
                    if(err){throw err;}
                    return done(null,newUser);
                })
            }
        })
    }));

    passport.use('local-login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
    function(req,email,password,done){
        User.findOne({'local.email':email},function(err,user){
            if(err){return done(err);}
            if(!user){
                return done(null,false,req.flash('loginMessage','El usuario no existe'));
            }
            if(!user.validPassword(password)) {
                return done(null,false,req.flash('mensajeLogin','Contraseña incorrecta'));
            }
            return done(null,user);
        })
    }));

   // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }
        });

    }));
  
}


