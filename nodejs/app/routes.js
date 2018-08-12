module.exports = function(app, passport) {
    
    app.get('/', function(req, res) {
        res.render('index'); // cambiar por rutas de react
    });

    
    app.get('/login', function(req, res) {
        debugger
        
        res.render('login', { 
            message: req.flash('loginMessage') 
        }); 
    });

    
     app.post('/login',passport.authenticate('local-login',{
         successRedirect:'/profile',//rutas react
         failureRedirect:'/login',//rutas react
         failureFlash:true
     }));

    app.get('/signup', function(req, res) {

        
        res.render('signup', { message: req.flash('signupMessage') });//rutas react
    });

    
     app.post('/signup',passport.authenticate('local-registro',{
         successRedirect:'/profile',//rutas react
         failureRedirect:'/signup',//rutas react
         failureFlash:true
     }));

    
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user 
        });
    });

      
    app.get('/auth/facebook', passport.authenticate('facebook', { 
        scope : ['public_profile', 'email']
      }));
  
      

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/profile',//rutas react
        failureRedirect : '/'//rutas react
    }));       
  
      
      app.get('/logout', function(req, res) {
          req.logout();
          res.redirect('/');//rutas react
      });


    

    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    
    
};

function isLoggedIn(req, res, next) {

    
    if (req.isAuthenticated())
        return next();

    
    res.redirect('/');
}



