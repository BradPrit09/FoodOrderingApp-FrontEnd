import React, { Component } from 'react';
import Home from '../screens/home/Home';
import Checkout from '../screens/checkout/Checkout';
import Details from '../screens/details/Details';
import Profile from '../screens/profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {

constructor() {
  super();
  this.baseUrl = "http://localhost:3000";
}

  render() {
    return (
      <Router >
        <div className="main-container">
          <Route exact path='/' render={(props) => <Home  {...props} baseUrl={this.baseUrl} />} />
          <Route path='/restaurant/:restaurantID' render={(props) => <Details  {...props} baseUrl={this.baseUrl} />} />
          <Route path='/checkout' render={(props) => <Checkout  {...props} baseUrl={this.baseUrl} />} />
          {/*<Route path='/checkout' render={ (props) => (
            sessionStorage.getItem("access-token") === null?
             <Home  {...props}/>
             :
             <Checkout {...props} />
          )} 
            baseUrl={this.baseUrl} />*/}
          <Route exact path='/profile' render={(props) => <Profile  {...props} baseUrl={this.baseUrl} />} />
        </div>
      </Router>
    )
  }
}

export default Controller;