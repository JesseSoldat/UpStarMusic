import React, { Component } from 'react';
import {connect} from 'react-redux';
import AuthForm from '../components/AuthForm';
import * as actions from '../actions/auth';

class Register extends Component {

  authenticateUser = (values) => {
    this.props.startRegister(values)
  }

  render() {
    return (
      <div>
        <h4>Register</h4>
        <AuthForm type="register"
          getValues={(values) => this.authenticateUser(values)}/>
      </div>
    )
  }
}

export default connect(null, actions)(Register);