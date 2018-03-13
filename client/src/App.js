import 'react-input-range/lib/css/index.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import * as actions from './actions/auth';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import ArtistMain from './pages/ArtistMain';
const Welcome = () => (<div>Welcome</div>);

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
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={ArtistMain} />
            
          
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
