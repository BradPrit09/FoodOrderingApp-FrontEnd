import React, { Component } from 'react';
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
          
          
        </div>
      </Router>
    )
  }
}

export default Controller;