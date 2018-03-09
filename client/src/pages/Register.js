import React, { Component } from 'react';
import AuthForm from '../components/AuthForm';

class Register extends Component {

  authenticateUser = (values) => {
    console.log(values);
    
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


export default Register;