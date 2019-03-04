import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as auth from '../AuthFunctions';

class Users extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }
  componentDidMount(){
    auth.setHeader();
    axios.get('/users')
      .then(res => res.data)
      .then(users => this.setState({users: users}));
  }
  render() {
    const { users } = this.state;
    return (
      <div className="users">
        <ul>
          {users.map(user => <Link to={{pathname:/users/+user.id, hash:'#'}} key={'linkto'+ user.id}><li key={user.id}>{user.username}</li></Link>)}
          <Link to={{pathname:'/create/user', hash:'#'}}><li>Add New User</li></Link>
        </ul>

      </div>
    );
  }
}

export default Users;
