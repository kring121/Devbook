import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../AuthFunctions';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Column } from 'bloomer';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
      dataReturned: false
    }
  }
  componentDidMount(){
    auth.setHeader();
    axios.get('/check')
    .then(res => res.data)
    .then(userInfo => this.setState({userInfo: userInfo}))
    .then(dataReturned => this.setState({dataReturned: true}))
    .catch(err => console.log(err.response.data))
  }

  render() {
    const { searchBar } = this.props;
    const { userInfo, dataReturned } = this.state;
    return (
      <Column className='dashboard' isHidden='mobile' hasTextAlign='centered'>
        <div className='dashboard-icons'>
          <Link to={{pathname:'/posts', hash:'#'}}><FontAwesomeIcon icon={['fas', 'home']}/></Link>
          <FontAwesomeIcon onClick={searchBar} icon={['fas', 'search']}/>
          <Link to={{pathname:'/create/post', hash:'#'}}><FontAwesomeIcon icon={['fas', 'plus-square']}/></Link>
          { dataReturned ? <Link to={{pathname:'/users/' + userInfo.id, hash:'#'}}><FontAwesomeIcon icon={['fas', 'user']}/></Link> : null}
        </div>
      </Column>
    );
  }
}

export default Dashboard;
