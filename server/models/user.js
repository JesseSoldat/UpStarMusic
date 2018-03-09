const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: { type: String, unique: true, trim: true, lowercase: true },
  password: { type: String, trim: true, minlength: 5 }
});

UserSchema.pre('save', function(next) {
  const user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        console.log('password', user.password);
        next();
      });
    });
  } else {
    next();
  }  
});


const User = mongoose.model('User', UserSchema);
module.exports = {User};