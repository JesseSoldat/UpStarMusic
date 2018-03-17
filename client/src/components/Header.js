import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/artists';

class Header extends Component {
  state = { id: null }

  componentWillMount() {
    this.props.getArtistsIds().then(data => {
      this.setLink();
    });   
  }

  setLink = () => {
    const {artistsIds} = this.props;
    const randomId = artistsIds[~~(Math.random() * artistsIds.length)];
    // console.log('Artists', randomId);
    if(randomId) {
      this.setState(() => ({id: randomId}));
    } 
  }

  renderBrand = () => {   
    if(this.props.auth) {
      return (<Link to="/dashboard" className="left brand-logo">JBeats</Link>);
    }
    return (<Link to="/" className="left brand-logo">JBeats</Link>);    
  }

  renderRightLinks = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key={1}>
            <Link to="/register">Register</Link>
          </li>,
          <li key={2}>
            <Link to="/login">Login</Link>
          </li>
        ];
    
      default:
        return [
          <li key={1}>
           <Link to={`/artists/${this.state.id}`} onClick={this.setLink}>Random Artist</Link>
          </li>,
           <li key={2}>
            <Link to={'/artists/new'}>
              Create Artist
            </Link>
          </li>,
          <li key={3}>
            <a href="/auth/logout">Logout</a>
          </li>
        ]
    }
    
  }

  render() {
    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper">
            {this.renderBrand()}

            <ul className="right">
              {this.renderRightLinks()}
            </ul>
          </div>

        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({auth, artists}) => ({
  auth,
  artistsIds: artists.artistsIds
});

export default connect(mapStateToProps, actions)(Header);