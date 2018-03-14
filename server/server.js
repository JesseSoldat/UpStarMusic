require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const User = require('./models/user');
const Artist = require('./models/artist');

require('./db/database');

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/userRoutes')(app, User, passport);
require('./routes/artistRoutes')(app, Artist);

if(process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT, (err) => {
  if(err) return console.log('SERVER ERR____________', err);
  console.log(`Server running on port: ${process.env.PORT}`);
}); 