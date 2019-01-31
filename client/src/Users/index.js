import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }
  componentDidMount(){
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({users: users}));
    axios.get('/users')
      .then(res => res.data)
      .then(users => this.setState({users: users}));
  }
  render() {
    const { users } = this.state;
    return (
      <div className="users">
        <ul>
          {users.map(user => <Link to={/users/+user.id}><li key={user.id}>{user.username}</li></Link>)}
          <Link to='/create/user'><li>Add New User</li></Link>
        </ul>

      </div>
    );
  }
}

export default Users;
