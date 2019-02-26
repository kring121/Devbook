import React, { Component } from 'react';
import axios from 'axios';
import UsersPosts from '../UsersPosts';
import * as auth from '../AuthFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Columns, Column, Title, Subtitle, Container } from 'bloomer';
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
      .catch(err => console.log(err.response.data));
  }

  filterInfo(profile){
    const objectToArray = Object.entries(profile);
    const filteredObject = objectToArray.filter(element => element[1] !== null);

    return filteredObject.map(function(index){
      switch(index[0]){
        case 'github':
        return <a href={index[1]}><FontAwesomeIcon className='social-icon' icon={['fab', 'github']}/></a>
        case 'codepen':
        return <a href={index[1]}><FontAwesomeIcon className='social-icon' icon={['fab', 'codepen']}/></a>
        case 'linkedin':
        return <a href={index[1]}><FontAwesomeIcon className='social-icon' icon={['fab', 'linkedin']}/></a>
        case 'website':
        return <a href={index[1]}><FontAwesomeIcon className='social-icon' icon={['fas', 'desktop']}/></a>
        default:
        return null
      }
    })
  }


  render() {
    const { user, dataReturned } = this.state;
    const { profile } = user;
    return (
      <div className="user-profile">
        <Columns>
          <Column id='user-info-column' hasTextAlign='centered' isSize='1/4' isHidden='mobile'>
            <FontAwesomeIcon icon={['fas', 'user']} style={{fontSize: '30px', marginTop: '10%'}}/>
            <Title id='user-title' isSize={5}>{user.name}</Title>
            <Subtitle id='user-subtitle' isSize={6}>{user.username}</Subtitle>
            {dataReturned && profile.bio !== null ? <h2>{profile.bio}</h2> : null}
            {dataReturned ? <div id='social-links'>{this.filterInfo(profile)}</div>
            : null}
          </Column>
          <Column isSize='3/4'>
            <Container id='mobile-info' isHidden='desktop' isHidden='tablet'>
              <Title id='mobile-user-title' isSize={5}>{user.name}</Title>
              <Subtitle id='mobile-user-subtitle' isSize={6}>{'@' + user.username}</Subtitle>
              {dataReturned && profile.bio !== null ? <h2 id='mobile-bio'>{profile.bio}</h2> : null}
              {dataReturned ? <div id='social-links-mobile'>{this.filterInfo(profile)}</div>
              : null}
            </Container>
          { dataReturned === true ? <UsersPosts posts={user.posts} userId={user.id} username={user.username} nameOfUser={user.name}/> : null }
          </Column>
        </Columns>
      </div>
    );
  }
}

export default UserProfile;
