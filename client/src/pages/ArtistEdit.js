import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/artists';

class ArtistEdit extends Component {
  state = {
    name: '',
    age: '',
    yearsActive: '',
    genre: ''
  };

  componentWillMount() {
    this.props.findArtist(this.props.id);
  }

  componentWillReceiveProps({artist}) {
    if(artist) {
      const {name, age, yearsActive, genre} = artist;
      this.setState(() => ({name, age, yearsActive, genre}));
    }
  }

  componentWillUpdate(nextProps) {
    console.log('componentWillUpdate', nextProps.match.params.id, this.props.id);   
    if(nextProps.match.params.id !== this.props.id) {
      console.log('componentWillUpdate NO MATCH API REQUEST SENT');
      this.props.findArtist(nextProps.match.params.id);  
    }
  }

  componentWillUnmount() {
    this.props.clearError();
  }

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.editArtist(this.props.id, this.state, this.props.history);
  }

  onChangeName = (e) => {
    const name = e.target.value;
    this.setState(() => ({name}) );
  }

  onChangeAge = (e) => {
    const age = e.target.value;
    this.setState(() => ({age}) );
  }

  onChangeYearsActive = (e) => {
    const yearsActive = e.target.value;
    this.setState(() => ({yearsActive}) );
  }

  onChangeGenre = (e) => {
    const genre = e.target.value;
    this.setState(() => ({genre}) );
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-field">
          <input type="text"
            value={this.state.name}
            onChange={this.onChangeName}
            placeholder="Name"
          />
        </div>
        <div className="input-field">
          <input type="text"
            value={this.state.age}
            onChange={this.onChangeAge}
            placeholder="Age"
          />
        </div>
        <div className="input-field">
          <input
            value={this.state.yearsActive}
            onChange={this.onChangeYearsActive}
            placeholder="Years Active"
          />
        </div>
        <div className="input-field">
          <input
            value={this.state.genre}
            onChange={this.onChangeGenre}
            placeholder="Genre"
          />
        </div>
        <div className="has-error">
          {this.props.errorMessage}
        </div>
        <button className="btn">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = ({artists, errors}, ownProps) => ({
  artist: artists.artist,
  id: ownProps.match.params.id,
  errors
});

export default connect(mapStateToProps, actions)(withRouter(ArtistEdit));