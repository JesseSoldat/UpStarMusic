const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  // console.log('serializeUser', user);  
  done(null, user._id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    // console.log('deserializeUser', user);    
    done(null, user);
  });
});

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async(req, email, password, done) => {
  try {
    const user = await User.findOne({email});
    if(!user) { return done(null, false); }
    if(!user.comparePasswords(password)) {
      return done(null, false);
    }    
    return done(null, user);
  } 
  catch (err) {
    return done(null, false);
  }
}));
