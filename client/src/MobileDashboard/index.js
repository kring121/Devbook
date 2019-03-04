import React, { Component } from 'react';
import * as auth from '../AuthFunctions';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Navbar, NavbarStart, NavbarItem } from 'bloomer';

class MobileDashboard extends Component {
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
      <Navbar className='mobile-dashboard' isHidden='desktop' isHidden='tablet' hasTextAlign='centered'>
        <NavbarStart>
        <NavbarItem>
        <div className='mobile-dashboard-icons'>
          <Link to='/posts'><FontAwesomeIcon icon={['fas', 'home']}/></Link>
          <FontAwesomeIcon onClick={searchBar} icon={['fas', 'search']}/>
          <Link to='/create/post'><FontAwesomeIcon icon={['fas', 'plus-square']}/></Link>
          { dataReturned ? <Link to={{pathname:'/users/' + userInfo.id, hash:'#'}}><FontAwesomeIcon icon={['fas', 'user']}/></Link> : null}
        </div>
        </NavbarItem>
        </NavbarStart>
      </Navbar>
    );
  }
}

export default MobileDashboard;
