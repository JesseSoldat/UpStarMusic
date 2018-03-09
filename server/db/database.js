const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, (err) => {
  if(err) return console.log('DATABASE ERR_________', err);
  console.log('DATABASE connected');
});

module.exports = { mongoose };
