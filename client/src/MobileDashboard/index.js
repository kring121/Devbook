import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Columns, Column, Title, Field, Control, Input, Button, Box, Menu, MenuList, MenuLink, Container, Navbar, NavbarStart, NavbarItem } from 'bloomer';

class MobileDashboard extends Component {

  render() {
    const { searchBar, userId } = this.props;
    return (
      <Navbar className='mobile-dashboard' isHidden='desktop' isHidden='tablet' hasTextAlign='centered'>
        <NavbarStart>
        <NavbarItem>
        <div className='mobile-dashboard-icons'>
          <Link to='/posts'><FontAwesomeIcon icon={['fas', 'home']}/></Link>
          <FontAwesomeIcon onClick={searchBar} icon={['fas', 'search']}/>
          <Link to='/create/post'><FontAwesomeIcon icon={['fas', 'plus-square']}/></Link>
          <Link to={'/users/' + userId}><FontAwesomeIcon icon={['fas', 'user']}/></Link>
        </div>
        </NavbarItem>
        </NavbarStart>
      </Navbar>
    );
  }
}

export default MobileDashboard;
