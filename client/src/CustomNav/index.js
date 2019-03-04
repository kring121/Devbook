import React, { Component } from 'react';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, NavbarBrand, NavbarItem, NavbarLink, NavbarDropdown, NavbarEnd } from 'bloomer';
import './style.css';

class CustomNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {}
    }
  }
  componentDidMount(){
    auth.setHeader();
    axios.get('/check')
    .then(res => res.data)
    .then(userInfo => this.setState({userInfo: userInfo}))
    .catch(err => console.log(err.response.data))
  }

  render() {
    const { launchModal } = this.props;
    const { userInfo } = this.state;
    return (
      <Navbar id='navbar'>
        <NavbarBrand>
          <NavbarItem>
            <FontAwesomeIcon id='dev' icon={['fab', 'dev']} />
          </NavbarItem>
          <NavbarItem id='nav-user' hasDropdown isHoverable isHidden='desktop'>
            <FontAwesomeIcon id='user-circle' icon={['fas', 'user-circle']} />
            <NavbarLink href={'#/users/'+userInfo.id} id='nav-dropdown'>{userInfo.username}</NavbarLink>
            <NavbarDropdown>
                <NavbarItem className='dropdown-options' href='#/edit/profile'><FontAwesomeIcon className='drop-icon' icon={['fas', 'edit']}/>Edit Profile</NavbarItem>
                <NavbarItem onClick={launchModal} className='dropdown-options' ><FontAwesomeIcon className='drop-icon' icon={['fas', 'sign-out-alt']}/>Log Out</NavbarItem>
            </NavbarDropdown>
          </NavbarItem>
        </NavbarBrand>
        <NavbarEnd>
          <NavbarItem id='nav-user' hasDropdown isHoverable isHidden='touch'>
            <FontAwesomeIcon id='user-circle' icon={['fas', 'user-circle']} />
            <NavbarLink href={'#/users/'+userInfo.id} id='nav-dropdown'>{userInfo.username}</NavbarLink>
            <NavbarDropdown>
                <NavbarItem className='dropdown-options' href='#/edit/profile'><FontAwesomeIcon className='drop-icon' icon={['fas', 'edit']}/>Edit Profile</NavbarItem>
                <NavbarItem onClick={launchModal} className='dropdown-options'><FontAwesomeIcon className='drop-icon' icon={['fas', 'sign-out-alt']}/>Log Out</NavbarItem>
            </NavbarDropdown>
          </NavbarItem>
        </NavbarEnd>
      </Navbar>
    );
  }
}

export default CustomNav;
