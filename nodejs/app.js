var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash =  require('connect-flash');
var morgan = require('morgan');
var cookieParser =  require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./config/database.js');
mongoose.connect(db.url);

require ('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs'); // cambiar a react las vistas

app.use(session({
    secret:'AH2018',
    resave: true,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app,passport);

app.listen(port);
console.log('puerto'+port);