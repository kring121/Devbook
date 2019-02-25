import React, { Component } from 'react';
import axios from 'axios';
import UsersPosts from '../UsersPosts';
import * as auth from '../AuthFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Columns, Column } from 'bloomer';
import './style.css';

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: [],
      dataReturned: false
    }
  }
  componentDidMount(){
    const { userId } = this.props.match.params
    auth.setHeader();
    axios.get('/users/'+ userId)
      .then(res => res.data)
      .then(user => this.setState({user: user}))
      .then(userReturned => this.setState({dataReturned: true}))
  }


  render() {
    const { user, dataReturned } = this.state;
    return (
      <div className="user-profile">
        <Columns>
          <Column id='user-info-column'>
            <FontAwesomeIcon icon={['fas', 'user']}/>
            <h1>{user.name}</h1>
            <h2>{user.username}</h2>
          </Column>
          <Column isSize='3/4'>
          { dataReturned === true ? <UsersPosts posts={user.posts} userId={user.id} username={user.username} nameOfUser={user.name}/> : null }
          </Column>
        </Columns>
      </div>
    );
  }
}

export default UserProfile;
