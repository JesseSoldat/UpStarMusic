import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Register from './pages/Register';
const Welcome = () => (<div>Welcome</div>);
const Dashboard = () => (<div>Dashboard</div>);

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
