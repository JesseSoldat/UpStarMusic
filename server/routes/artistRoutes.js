
module.exports = (app, Artist) => {

  app.get('/api/seed', async (req, res) => {
    const response = await require('../db/seed')(Artist); 
    res.send(response); 
  });

  app.get('/api/age-range', (req, res) => {
    console.log('/api/age-range', req.body);
    
    const minQuery = Artist
      .find({})
      .sort({ age: 1 })
      .limit(1)
      .then(artists => artists[0].age);

    const maxQuery = Artist
      .find({})
      .sort({ age: -1 })
      .limit(1)
      .then(artists => artists[0].age);

    return Promise.all([minQuery, maxQuery])
      .then(res => {
        return { min: res[0], max: res[1] };
      });

  });
}