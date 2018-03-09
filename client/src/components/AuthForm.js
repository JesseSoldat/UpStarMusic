import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import AuthFields from './AuthFields';
import { validateEmail } from '../utils/utils';
const fields = [
  { label: 'Email', name: 'email' , type: 'text'},
  { label: 'Password', name: 'password', type: 'password'}
];

class AuthForm extends Component {
  renderFields = () => {
    return fields.map(({label, name, type}) => (
      <Field
        key={name}
        component={AuthFields}
        type={type}
        label={label}
        name={name}
      />
    ));
  }

  

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.getValues)}>
          {this.renderFields()}
          <button className="teal btn-flat right white-text" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  
  errors.email = validateEmail(values.email || '');

  fields.forEach(({name}) => {
    if(!values[name]){
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
}

export default reduxForm({
  form: 'authForm',
  validate
})(AuthForm);