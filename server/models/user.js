const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: { type: String, unique: true, trim: true, lowercase: true },
  password: { type: String, trim: true, minlength: 5 }
});

UserSchema.pre('save', function(next) {
  const user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);