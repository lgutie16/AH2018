var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User       = require('../app/models/user');

var configAuth = require('./auth');

module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
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

    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true;  
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        process.nextTick(function() {

            
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

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

                        return done(null, user); 
                    } else {
                        
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
                var user            = req.user; 

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


