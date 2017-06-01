import React, { Component } from 'react';
import './App.css';

var currentTime = new Date().getDate().toString();

class App extends Component {
  render() {
    return (
      <div className="hello">
        <h1>Calendar {currentTime}</h1>
      </div>
    );
  }
}

export default App;
