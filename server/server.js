require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

const {mongooseDB} = require('./db/database');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

require('./routes/userRoutes')(app, User);

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