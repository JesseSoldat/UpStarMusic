module.exports = (app, User) => {

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
}