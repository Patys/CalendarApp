import React from 'react';
import DayPicker from "react-day-picker";

import "react-day-picker/lib/style.css";
import "./App.css";

import Users from './Users';

class Calendar extends React.Component {
  state = {
    selectedDay: new Date(),
    value: ''
  }

  users = null

  handleDayClick = (day, { selected }) => {
    this.setState({
      selectedDay: day,
    });
    this.getTimeFromServer(day);
  }

  getTimeFromServer = (day) => {
    console.log(this.weekOfYear(day));

    // fetch(`https://timesheet-staging-aurity.herokuapp.com/api/users`)
    // .then((response) => {
    //     return response.json();
    //   }).then((json) => {
    //     this.setState({users: json});
    //     this.forceUpdate();
    //   }).catch((ex) => {
    //     console.log('parsing failed', ex);
    //   });
  }

  weekOfYear = (date) => {
    var d = new Date(+date);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
  }

  render = () => {
    return (
      <div>
        <Users ref={ (el) => {this.users = el}}/>
        <DayPicker
          onDayClick={this.handleDayClick}
          modifiers={ {
            past: { before: new Date() },
            selected: new Date(this.state.selectedDay)
          } }
        />
        <p>The selected day is { this.state.selectedDay.toLocaleDateString() }</p>
        <input type="number" min="0" max="24" placeholder="Hours"></input>
        <input type="number" min="0" max="59" placeholder="Minutes"></input>
        <button>Approve</button>
        <button>Reject</button>
      </div>
    );
  }
}

export default Calendar;
