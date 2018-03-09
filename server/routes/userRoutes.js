module.exports = (app, User) => {
  app.post('auth/register', async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    const user = new User(req.body);

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