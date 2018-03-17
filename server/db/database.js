const mongoose = require('mongoose');
const db = require('mongodb').Db;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, (err, database) => {
  if(err) return console.log('DATABASE ERR', err);
  console.log('DATABASE CONNECTED');
});

module.exports = { mongoose };
