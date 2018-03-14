const {times, random, capitalize } = require('lodash');

const faker = require('faker');
const GENRES = require('./constants');

const ARTISTS_TO_ADD = 300;
let artistsCollection;

module.exports = (Artist) => { 
  return times(ARTISTS_TO_ADD, () => {
    
    const artist = new Artist({
      name: faker.name.findName(),
      age: random(15, 45),
      yearsActive: random(0, 15),
      image: faker.image.avatar(),
      genre: getGenre(),
      website: faker.internet.url(),
      netWorth: random(0, 5000000),
      labelName: faker.company.companyName(),
      retired: faker.random.boolean(),
      albums: getAlbums()
    });

    return artist.save().then(() => {
      return artist;
    });  
  }); 
}

function getAlbums() {
  return times(random(1, 5), () => {
    const copiesSold = random(4, 10000000);
    return {
      title: capitalize(faker.random.words()),
      date: faker.date.past(),
      copiesSold,
      numberTracks: random(9, 20),
      image: getAlbumImage(),
      revenue: copiesSold * 11.99
    };
  });
}

function randomEntry(array) {
  return array[Math.floor((Math.random() * array.length))];
}

function getGenre() {
  return randomEntry(GENRES);
}

function getAlbumImage() {
  const types = Object.keys(faker.image);
  const method = randomEntry(types);
  return faker.image[method]();
}







