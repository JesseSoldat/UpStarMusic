import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends Component {
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
          <li>
            <Link to="/register">Register</Link>
          </li>,
          <li>
            <Link to="/login">Login</Link>
          </li>
        ];
    
      default:
        break;
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

const mapStateToProps = ({auth}) => ({
  auth
});

export default connect(mapStateToProps)(Header);