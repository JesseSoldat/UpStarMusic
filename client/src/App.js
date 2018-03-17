import 'react-input-range/lib/css/index.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import * as actions from './actions/auth';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import ArtistMain from './pages/ArtistMain';
import ArtistDetail from './pages/ArtistDetail';
import ArtistCreate from './pages/ArtistCreate';
import ArtistEdit from './pages/ArtistEdit';

const Welcome = () => (<div>Welcome</div>);
const NotFound = () => (<div>The Page Was Not Found</div>);


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
        <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={ArtistMain} />
          <Route exact path="/artists/new" component={ArtistCreate}/>
          <Route exact path="/artists/:id" component={ArtistDetail} />
          <Route exact path="/artists/edit/:id" component={ArtistEdit} />  
          <Route component={NotFound} />             
        </Switch>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
