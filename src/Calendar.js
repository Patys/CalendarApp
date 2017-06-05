import React from 'react';
import DayPicker from "react-day-picker";

import "react-day-picker/lib/style.css";
import "./App.css";

import ApiRequest from './ApiRequest';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
     ApiRequest.getUsers((data) => {
      this.setState({users: data, current_user: data[0].id}, ()=> {
        this.getApproved();
        this.getRejected();
      });
    });
  }

  state = {
    selectedDay: new Date(),
    users: [],
    current_user: '',
    current_week_id: null,
    hours: 0,
    minutes: 0,
    approvedDays: [],
    rejectedDays: []
  }
  dayPicker = null

  handleDayClick = (day, modifiers) => {
    this.setState({
      selectedDay: day,
    }, () => {
      this.getApproved();
      this.getRejected();
      this.setHours();
    });
  }

  getApproved = () => {
    let days = [];
    ApiRequest.getDataForAMonth(this.getCurrentUser(), this.state.selectedDay.getMonth()+1, 2017, (data) => {
      if(data.errors) return;
      data.data.weeks.forEach((week) => {
        if(week.status === 'approved') {
          week.days_in_week.forEach((day) => {
            days.push(new Date(data.data.year, data.data.month-1, day.day_number));
          });
        }
      });
      this.setState({approvedDays: days});
    });
    // return days;
  }

  getRejected = () => {
    let days = [];
    ApiRequest.getDataForAMonth(this.getCurrentUser(), this.state.selectedDay.getMonth()+1, 2017, (data) => {
      if(data.errors) return;
      data.data.weeks.forEach((week) => {
        if(week.status === 'rejected') {
          week.days_in_week.forEach((day) => {
            days.push(new Date(data.data.year, data.data.month-1, day.day_number));
          });
        }
      });
      this.setState({rejectedDays: days});
    });

    // return days;
  }

  approveWeek = () => {
    if(this.state.current_week_id) {
      ApiRequest.approveWeek(this.state.current_week_id, this.getCurrentUser(), (data) => {
        console.log(data);
        this.getApproved();
        this.getRejected();
      });
    } else {
      console.log('no week id');
    }
  }

  rejectWeek = () => {
    if(this.state.current_week_id) {
      ApiRequest.rejectWeek(this.state.current_week_id, this.getCurrentUser(), (data) => {
        console.log(data);
        this.getApproved();
        this.getRejected();
      });
    } else {
      console.log('no week id');
    }
  }

  setHours = () => {
    ApiRequest.getDataForAMonth(this.getCurrentUser(), this.state.selectedDay.getMonth()+1, 2017, (data) => {
      if(data.errors) return;
      data.data.weeks.forEach((week) => {
        if(week.week_number === this.weekOfYear(this.state.selectedDay)) {
          this.setState({current_week_id: week.week_id});
          week.days_in_week.forEach((day) => {
            if(day.day_number === this.state.selectedDay.getDate()){
              this.setState({hours: day.hours, minutes: day.minutes});
            }
          });
        }
      });
    });
  }

  weekOfYear = (date) => {
    var d = new Date(+date);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
  }


  handleUserChange = (event) => {
    this.setState({current_user: event.target.value}, () => {
      this.getApproved();
      this.getRejected();
    });
  }

  getCurrentUser = () => {
    return this.state.current_user;
  }

  onMonthChange = (date) => {
    this.setState({
      selectedDay: date,
    }, () => {
      this.getApproved();
      this.getRejected();
      this.setHours();
    });
  }

  render = () => {
    return (
      <div>
        <div className="users">
          <select className="selectUser" value={this.state.current_user} onChange={this.handleUserChange}>
            {
              this.state.users.map((data,index) => {
                return <option key={index} value={data.id}>{data.username}</option>
              })
            }
          </select>
        </div>
        <DayPicker
          onDayClick={this.handleDayClick}
          onMonthChange={this.onMonthChange}
          modifiers={ {
            selected: new Date(this.state.selectedDay),
            approved: this.state.approvedDays,
            rejected: this.state.rejectedDays
          } }
        />
        <div className="info">
          <p>The selected day is { this.state.selectedDay.toLocaleDateString() }</p>
          <p>Hours: {this.state.hours} Minutes: {this.state.minutes}</p>
          <button onClick={this.approveWeek}>Approve</button>
          <button onClick={this.rejectWeek}>Reject</button>
        </div>
      </div>
    );
  }
}

export default Calendar;
