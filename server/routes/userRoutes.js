const passportService = require('../services/passport');

module.exports = (app, User, passport) => {

  app.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({email, password});

    try {
      const existingUser = await User.findOne({email});
      if(existingUser) res.send({error: 'Account with that email address already exists'});

      await user.save();
      req.logIn(user, (err, done) => {
        res.send(user);
      });
    } 
    catch (err) {
      res.send(err)
    }
  }); 

  app.post('/auth/login', passport.authenticate('local-login'), (req, res) => {
    res.send(req.user)  
  });

  app.get('/auth/user', (req, res) => {
    res.send(req.user);
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


}