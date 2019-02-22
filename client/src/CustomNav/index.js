import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as auth from '../AuthFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, NavbarBrand, NavbarItem, NavbarLink, NavbarDropdown, NavbarEnd, Icon, Field, Input, Control, Button } from 'bloomer';
import './style.css';

class CustomNav extends Component {
  render() {
    const { userInfo, launchModal } = this.props;
    return (
      <Navbar id='navbar'>
        <NavbarBrand>
          <NavbarItem>
            <FontAwesomeIcon id='dev' icon={['fab', 'dev']} />
          </NavbarItem>
          <NavbarItem id='nav-user' hasDropdown isHoverable isHidden='desktop'>
            <FontAwesomeIcon id='user-circle' icon={['fas', 'user-circle']} />
            <NavbarLink href={'/users/'+userInfo.id} id='nav-dropdown'>{userInfo.username}</NavbarLink>
            <NavbarDropdown>
                <NavbarItem className='dropdown-options' href='#/'><FontAwesomeIcon className='drop-icon' icon={['fas', 'edit']}/>Edit Profile</NavbarItem>
                <NavbarItem onClick={launchModal} className='dropdown-options' ><FontAwesomeIcon className='drop-icon' icon={['fas', 'sign-out-alt']}/>Log Out</NavbarItem>
            </NavbarDropdown>
          </NavbarItem>
        </NavbarBrand>
        <NavbarEnd>
          <NavbarItem id='nav-user' hasDropdown isHoverable isHidden='touch'>
            <FontAwesomeIcon id='user-circle' icon={['fas', 'user-circle']} />
            <NavbarLink href={'/users/'+userInfo.id} id='nav-dropdown'>{userInfo.username}</NavbarLink>
            <NavbarDropdown>
                <NavbarItem className='dropdown-options'><FontAwesomeIcon className='drop-icon' icon={['fas', 'edit']}/>Edit Profile</NavbarItem>
                <NavbarItem onClick={launchModal} className='dropdown-options'><FontAwesomeIcon className='drop-icon' icon={['fas', 'sign-out-alt']}/>Log Out</NavbarItem>
            </NavbarDropdown>
          </NavbarItem>
        </NavbarEnd>
      </Navbar>
    );
  }
}

export default CustomNav;
