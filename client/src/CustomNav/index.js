import React, { Component } from 'react';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, NavbarBrand, NavbarStart, NavbarItem, NavbarLink, NavbarDropdown, NavbarEnd, Icon, Field, Input, Control } from 'bloomer';
import './style.css';

class CustomNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
    }
  }
  componentDidMount() {
    auth.setHeader();
    axios.get('/check')
      .then(res => this.setState({ userInfo: res.data}))
      .catch(err => console.log(err.response.data))
  }

  render() {
    const { userInfo } = this.state;
    return (
      <Navbar id='navbar'>
        <NavbarBrand>
          <NavbarItem>
            <FontAwesomeIcon id='dev' icon={['fab', 'dev']} />
          </NavbarItem>
        </NavbarBrand>
        <NavbarStart>
          <NavbarItem isHidden='touch'>
            <Field>
              <Control>
                <Input id='find-user' type='text' placeholder='Find User'/>
              </Control>
            </Field>
          </NavbarItem>
          <NavbarItem isHidden='touch'>
             <FontAwesomeIcon id='search' icon={['fas', 'search']}/>
          </NavbarItem>
        </NavbarStart>
        <NavbarEnd>
          <NavbarItem id='nav-user' hasDropdown isHoverable isAlign='centered'>
            <FontAwesomeIcon id='user-circle' icon={['fas', 'user-circle']} />
            <NavbarLink id='nav-dropdown' href=''>{userInfo.username}</NavbarLink>
            <NavbarDropdown>
                <NavbarItem href='#/'>One A</NavbarItem>
                <NavbarItem href='#/'>Two B</NavbarItem>
                <NavbarItem href='#/'>Two A</NavbarItem>
            </NavbarDropdown>
          </NavbarItem>
        </NavbarEnd>
      </Navbar>
    );
  }
}

export default CustomNav;
