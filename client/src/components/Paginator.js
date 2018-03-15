import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/artists';

class Paginator extends Component {
  back = () => {
    const { offset, limit, form: { filters: { values } } } = this.props;
    if(offset === 0) return;
    this.props.searchArtists({
      name: values.name || '',
      // ...this.props.filters,
      offset: (offset - 10),
      limit
    });
  }

  advance = () => {
    const { offset, limit, count, form: { filters: { values } } } = this.props;
    // console.log('values', values);
    // console.log('limit', limit);
    // console.log('offset', offset);
    
    if((offset + limit) > count) return;
    this.props.searchArtists({
      name: values.name || '',
      // ...this.props.filters,
      offset: (offset + 10),
      limit
    });
    console.log(this.props);
    
  }

  left = () => (
    <li className={this.props.offset === 0 ? 'disabled' : ''}>
      <a onClick={this.back}>
        <i className="material-icons">chevron_left</i>
      </a>
    </li>
  );

  right = () => {
    const { offset, limit, count } = this.props;
    const end = ((offset + limit) >= count) ? true : false;
    return (
      <li className={end ? 'diabled' : ''}>
        <a onClick={this.advance}>
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    );
  }
  
  render() {
    return (
      <div className="center-align">
        <ul className="pagination">
          {this.left()}
          <li>
            <a>Page {this.props.offset / 10 + 1}</a>
          </li>
          {this.right()}
        </ul>
        {this.props.count} Records Found
      </div>
    )
  }
}

const mapStateToProps = ({ artists: { limit, offset, count }, form }) => ({
  limit,
  offset,
  count,
  form
});

export default connect(mapStateToProps, actions)(Paginator);