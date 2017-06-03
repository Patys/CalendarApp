import React from 'react';
import ApiRequest from './ApiRequest';

class Users extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.getUsers();
  // }

  state = {
    users: [],
    current_user: ''
  }

  componentWillMount = () => {
    ApiRequest.getUsers((data) => {
      this.setState({users: data});
    });
    ApiRequest.getDataForAMonth(1,4,2017, (data) => {
      console.log(data);
    });
  }

  handleChange = (event) => {
    this.setState({current_user: event.target.value});
  }

  getCurrentUser = () => {
    return this.state.current_user;
  }

  render = () => {
    if(this.state.users.length > 0) {
      return (<select className="selectUser" value={this.state.value} onChange={this.handleChange}>
        {
          this.state.users.map((data,index) => {
            return <option key={index} value={data.id}>{data.username}</option>
          })
        }
      </select>);
    } else {
      // this.getUsers();
      return (<div><select className="selectUser" value={this.state.value} onChange={this.handleChange}>
        <option value="no">No Users</option>
      </select>
      <button onClick={this.getUsers}>Refresh</button></div>);
    }
  }
}

export default Users;
