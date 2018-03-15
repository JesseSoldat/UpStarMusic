import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { includes } from 'lodash';
import * as actions from '../actions/artists';

class ArtistIndex extends Component {
  onChange = (_id) => {
    if(includes(this.props.selection, _id)) {
      this.props.deselectArtist(_id);
    } else {
      this.props.selectArtist(_id);
    }
  }

  renderRetire = () => {
    if(this.props.selection.length) {
      // console.log('renderRetire', this.props.selection); 
      return (
        <div>
          <button className="btn"
            onClick={() => this.props.setRetired({_ids: this.props.selection})}>
            Retire
          </button>
          <button className="btn"
            onClick={() => this.props.setNotRetired({_ids: this.props.selection})}>
            Unretire
          </button>
        </div>
      );
    }
  }

  renderList = (artist) => {
    const {_id} = artist;
    const classes = `collection-item avatar ${artist.retired && 'retired'}`;

    return (
      <li className={classes} key={_id}>
        <div>
          <input type="checkbox"
            id={_id}
            onChange={() => this.onChange(_id)}
            checked={includes(this.props.selection, _id)}
          />
          <label htmlFor={_id} />
        </div>
        <img src={artist.image} alt="artist pic" className="circle"/>
        <div>
          <span className="title">
            <strong>{artist.name}</strong>
          </span>
          <p>
            <b>{artist.age}</b> years old
            <br />
            {artist.yearsActive} years active
          </p>
        </div>
        <Link to={`artists/${artist._id}`}
          className="secondary-content">
          <i className="material-icons">play_arrow</i>
        </Link>
      </li>
    )
  }

  renderEmptyCollection = () => {
    if(this.props.artists.all.length) return;
    return (
      <div className="center-align">
        <h5>No records found!</h5>
        <div>Try searching again</div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderRetire()}
        <ul className="collection">
          {this.props.artists.all.map(this.renderList)}
          {this.renderEmptyCollection()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({artists, selection}) => ({
  artists,
  selection
});

export default connect(mapStateToProps, actions)(ArtistIndex);