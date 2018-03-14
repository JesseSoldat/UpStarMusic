import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../actions/artists';
import Range from './filters/Range';

const TEXT_FIELDS = [
  {label: 'Name', prop: 'name', component: "input"}
];

class ArtistFilter extends Component {
  componentWillMount() {
    if(this.props.filters) {
      this.props.searchArtists({
        name: '',
        ...this.props.filters
      });
    } else {
      this.props.searchArtists({
        name: '',
        sort: 'name'
      });
    }
  }

  componentDidMount() {
    this.props.setAgeRange();
    this.props.setYearsActiveRange();
  }

  handleSubmit = (formProps) => {
    console.log('handleSubmit', formProps); 
  }

  renderInputs = () => {
    return TEXT_FIELDS.map(({label, prop}) => (
      <div className="input-field" key={prop}>
        <Field
          placeholder={label}
          id={prop}
          name={prop}
          component="input"
          type="text"
        />
      </div>
    )); 
  } 

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="card blue-grey darken-1 row">
        <div className="card-content white-text">
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <div className="center-align card-title">
              Search
            </div>
            {this.renderInputs()}

            <div className="input-field">
              <Field
                id="age"
                label="Age"
                component={Range}
                type="text"
                name="age"
                range={this.props.ageRange}
              /> 
            </div>

            <div className="input-field">
              <Field
                id="years-active"
                label="Years Active"
                component={Range}
                type="text"
                name="yearsActive"
                range={this.props.yearsActive}
              />
            </div>

            <div className="sortByContainer">
              <label className="select">Sort By</label>
              <Field id="sort" name="sort" component="select">
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="yearsActive">Years Active
                </option>
              </Field>
            </div>

            <div className="center-align">
              <button className="btn">Submit</button>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({filterCriteria, form}) => ({
  yearsActive: filterCriteria.yearsActive,
  ageRange: filterCriteria.age,
  filters: form.filters && form.filters.values
});


export default connect(mapStateToProps, actions)(reduxForm({
  destroyOnUnmount: false,
  form: 'filters',
  initialValues: { sort: 'name' }
})(ArtistFilter));