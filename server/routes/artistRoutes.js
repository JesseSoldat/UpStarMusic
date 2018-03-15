
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

  app.post('/api/search-artists', (req, res) => {
    console.log('search-artists req.body', req.body);
    
    const offset = req.body[0].offset || 0;
    const limit = req.body[0].limit || 10;
    const sortProperty = req.body[0].sort || 'name';
    const criteria = req.body[0];

    const buildQuery = (criteria) => {
      const query = {};

      if(criteria.name) {
        query.$text = { $search: criteria.name };
      }
      
      if(criteria.age) {
        query.age = {
          $gte: criteria.age.min,
          $lte: criteria.age.max
        }
      }

      if(criteria.yearsActive) {
        query.yearsActive = {
          $gte: criteria.yearsActive.min,
          $lte: criteria.yearsActive.max
        }
      }
      return query;
    } 
    
    const query = Artist.find(buildQuery(criteria))
      .sort({ [sortProperty]: 1 })
      .skip(offset)
      .limit(limit)

    Promise.all([query, Artist.find(buildQuery(criteria)).count()])
      .then(data => {
        res.send({
          all: data[0],
          count: data[1],
          offset,
          limit
        });
      });
  });


  app.post('/api/set-retired', (req, res) => {
    const { _ids } = req.body;
    // console.log('_ids to retire', _ids);   
    Artist.update(
      { _id: { $in: _ids } },
      { retired: true },
      { mulit: true }
    ).then(() => {
      res.send({});
    })
    .catch(err => {
      res.send(err);
    });
  });

  app.post('/api/set-not-retired', (req, res) => {
    const { _ids } = req.body;
    // console.log('_ids to unretire', _ids);
    Artist.update(
      { _id: { $in: _ids } },
      { retired: false },
      { multi: true }
    ).then(() => {
      res.send({});
    })
    .catch(err => {
      res.send(err);
    });
  });

}

