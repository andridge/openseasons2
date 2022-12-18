var express = require('express');
var app = express();
//const chatgpt = require('chatgpt');
//
var passport = require('passport');
var session = require('express-session');
//
//
var bodyParser = require('body-parser')
const db = require("./models");
//
db.sequelize.sync({force:true});
// For Passport
app.use(session({
  secret: "cat",
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//models
const models = require('./models');
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//routes
const route = require('./routes/routes');
var authRoute = require('./routes/auth_routes')(app,passport);
//load passport strategies
require('./passport/passport.js')(passport,models.User)

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get("/",(req,res)=>{
    res.render("mainPage");
  });
  //app.use('/',router);
//server listen
app.use("/api_v1",route(express));
app.listen(1003,"0.0.0.0",function(){
  console.log("OPENSEASONS IS LIVE ON 1003");
});