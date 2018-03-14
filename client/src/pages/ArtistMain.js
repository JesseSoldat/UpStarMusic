import React from 'react';
import ArtistFilter from '../components/ArtistFilter';
import ArtistIndex from '../components/ArtistIndex';

const ArtistMain = () => (
  <div className="row">
    <div className="col s4">
      <ArtistFilter/>
    </div>
    <div className="col s8">
      <ArtistIndex/>
    </div>
  </div>
);

export default ArtistMain;