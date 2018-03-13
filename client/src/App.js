import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';

import * as actions from './actions/auth';
const Welcome = () => (<div>Welcome</div>);
const Dashboard = () => (<div>Dashboard</div>);

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
