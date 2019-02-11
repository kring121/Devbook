import React, { Component } from 'react';
import axios from 'axios';
class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: [],
    }
  }
  componentDidMount(){
    const { userId } = this.props.match.params
    const token = sessionStorage.getItem('jwttoken');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.get('/users/'+ userId)
      .then(res => res.data)
      .then(user => this.setState({user: user}));
  }
  render() {
    const { user } = this.state;
    return (
      <div className="user-profile">
        <h1>{user.name}</h1>
        <h2>{user.username}</h2>
      </div>
    );
  }
}

export default UserProfile;
