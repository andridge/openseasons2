var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get("/",(req,res)=>{
    res.render("mainPage");
  });

app.listen(1003);
console.log('Server is listening on port 1003');