import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Columns, Column, Title, Field, Control, Input, Button, Box, Menu, MenuList, MenuLink } from 'bloomer';

class Dashboard extends Component {

  render() {
    const { searchBar, userId } = this.props;
    return (
      <Column className='dashboard' isHidden='mobile' hasTextAlign='centered'>
        <div className='dashboard-icons'>
          <Link to='/posts'><FontAwesomeIcon icon={['fas', 'home']}/></Link>
          <FontAwesomeIcon onClick={searchBar} icon={['fas', 'search']}/>
          <Link to='/create/post'><FontAwesomeIcon icon={['fas', 'plus-square']}/></Link>
          <Link to={'/users/' + userId}><FontAwesomeIcon icon={['fas', 'user']}/></Link>
        </div>
      </Column>
    );
  }
}

export default Dashboard;
