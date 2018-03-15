import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/artists';

class ArtistDetail extends Component {

  componentWillMount() {
    this.props.findArtist(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    if(nextProps.match.params.id !== this.props.id) {
      console.log('componentWillReceiveProps id does NOT match');
      this.props.findArtist(nextProps.params.id)
    }
  }

  componentWillUnmount() {
    this.props.resetArtist();
  }

  onDelete = () => {
    this.props.deleteArtist(this.props.id, this.props.history);
  }

  renderAlbums = () => {
    const { albums } = this.props.artist;
    
    if(!albums || !albums.map) return;
    // console.log('renderAlbums', albums);

    return albums.map(album => (
      <div className="card album" key={album.title}>

        <div className="card-image">
          <img src={album.image} alt="album"/>
          <span className="card-title">
            <h4>{album.title}</h4>
          </span>
        </div>

        <div className="card-content">
          <div>
            <h5>{album.copiesSold}</h5>
            <i>copies sold</i>
          </div>
          <div>
            <h5>{album.numberTracks}</h5>
            <i>tracks</i>
          </div>
        </div>

      </div>
    ));
  }

  render() {
    if(!this.props.artist) return (<div>Loading</div>);

    const { artist: { name, age, genre, image, yearsActive, netWorth, labelName, _id } } = this.props;

    return (
      <div>
        <div className="spacer">
          <Link to="/dashboard">Back</Link>
          <a onClick={this.onDelete}>Delete</a>
          <Link to={`/artists/edit/${_id}`}>
            Edit
          </Link>
        </div>
        <ul className="collection artist-detail">
          <li className="collection-item header">
            <div>
              <h3>{name}</h3>
              <h5>Master of {genre}</h5>
            </div>
            <img src={image} alt="artist" className="right"/>
          </li>

          <li className="collection-item">
            <h5>{yearsActive}</h5>
            <p><i>Years Active</i></p>
          </li>

          <li className="collection-item">
            <h5>{age}</h5>
            <p><i>Years Old</i></p>
          </li>

          <li className="collection-item">
            <h5>${netWorth}</h5>
            <p><i>Net Worth</i></p>
          </li>

          <li className="collection-item">
            <h5>{labelName}</h5>
            <p><i>Label</i></p>
          </li>

          <li className="flex wrap">
            {this.renderAlbums()}
          </li>

        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({artists}, ownProps) => ({
  artist: artists.artist,
  id: ownProps.match.params.id
});

export default connect(mapStateToProps, actions)(withRouter(ArtistDetail));