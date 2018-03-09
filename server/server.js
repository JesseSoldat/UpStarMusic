require('./config/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.listen(process.env.PORT, (err) => {
  if(err) return console.log('ERR____________', err);
  console.log(`Server running on port: ${process.env.PORT}`);
});