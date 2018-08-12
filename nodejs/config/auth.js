module.exports = {

    'facebookAuth' : {
        'clientID'      : '652332581815808', 
        'clientSecret'  : 'cbd9a54687e3c8b9c2832a49ef14d4d4', 
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] 
        
    }
};