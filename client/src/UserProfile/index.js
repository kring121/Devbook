import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: [],
    }
  }
  componentDidMount(){
    const { userId } = this.props.match.params
    fetch(`/users/${ userId }`)
      .then(res => res.json())
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
