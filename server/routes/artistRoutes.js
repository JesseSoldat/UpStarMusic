
module.exports = (app, Artist) => {

  app.get('/api/seed', async (req, res) => {
    const response = await require('../db/seed')(Artist); 
    res.send(response); 
  });

  app.get('/api/age-range', (req, res) => {
   
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

    Promise.all([minQuery, maxQuery])
      .then(data => {
        res.send({ min: data[0], max: data[1] });
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get('/api/years-active', (req, res) => {
    const minQuery = Artist
      .find({})
      .sort({ yearsActive: 1 })
      .limit(1)
      .then(artists => artists[0].yearsActive);

    const maxQuery = Artist
      .find({})
      .sort({ yearsActive: -1 })
      .limit(1)
      .then(artists => artists[0].yearsActive);

      Promise.all([minQuery, maxQuery])
        .then(data => {
          res.send({ min: data[0], max: data[1] });
        })
        .catch(err => {
          res.send(err);
        });
  });
}