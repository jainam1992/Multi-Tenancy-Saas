var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: 'C:/my-webapp/apiKey-1H6I6YUQAWKFSYJZS0DHJ0C7V.properties',
  application: 'https://api.stormpath.com/v1/applications/7bAw1LEEwbfeva1tmK1CpH',
  secretKey: 'This is secret key',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

//var stormpath = require('express-stormpath');

app.get('/secret', stormpath.loginRequired, function(req, res) {
  res.send("If you're seeing this page, you must be logged in!");
});


app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});
app.use('/views/profile',require('./views/profile'));
app.get('/profile', function(req, res) {
  res.render('profile', {
    title: 'Success'
  });
});
app.listen(3000);