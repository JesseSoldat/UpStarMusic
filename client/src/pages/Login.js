import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import * as actions from '../actions/auth';

class Login extends Component {

  authenticateUser = (values) => {
    this.props.startLogin(values, this.props.history)
  }

  render() {
    return (
      <div>
        <h4>Login</h4>
        <AuthForm type="login"
          getValues={(values) => this.authenticateUser(values)}/>
      </div>
    )
  }
}

export default connect(null, actions)(withRouter(Login));