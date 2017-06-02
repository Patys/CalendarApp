import React, { Component } from 'react';
import './App.css';
import Calendar from './Calendar';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="hello">
          <h1>Calendar</h1>
        </div>
        <div className="calendar">
          <Calendar />
        </div>
      </div>
    );
  }
}

export default App;
