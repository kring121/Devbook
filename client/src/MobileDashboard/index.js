import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Columns, Column, Title, Field, Control, Input, Button, Box, Menu, MenuList, MenuLink, Container, Navbar, NavbarStart, NavbarItem } from 'bloomer';

class MobileDashboard extends Component {

  render() {
    const { searchBar } = this.props;
    return (
      <Navbar className='mobile-dashboard' isHidden='desktop' isHidden='tablet' hasTextAlign='centered'>
        <NavbarStart>
        <NavbarItem>
        <div className='mobile-dashboard-icons'>
          <FontAwesomeIcon icon={['fas', 'home']}/>
          <FontAwesomeIcon onClick={searchBar} icon={['fas', 'search']}/>
          <FontAwesomeIcon icon={['fas', 'plus-square']}/>
          <FontAwesomeIcon icon={['fas', 'user']}/>
        </div>
        </NavbarItem>
        </NavbarStart>
      </Navbar>
    );
  }
}

export default MobileDashboard;
