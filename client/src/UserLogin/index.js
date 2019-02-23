import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CreateUser from '../CreateUser';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, NavbarBrand, NavbarItem, NavbarEnd, Columns, Column, Field, Control, Input, Button, Subtitle, Title } from 'bloomer';
import './style.css';

class UserLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      fireRedirect: false,
    }
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    axios.post('/users/login', {
        username: username,
        password: password
      })
      .then((res) => sessionStorage.setItem('jwttoken', res.data.token))
      .then(() => {
        this.setState({ fireRedirect: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { fireRedirect } = this.state;
    if (fireRedirect === true) {
      return <Redirect to='/users'/>
    }
    return (
      <div className="user-login">
        <Navbar isColor='link' id='login-nav'>
          <NavbarBrand>
            <NavbarItem>
              <FontAwesomeIcon id='dev' icon={['fab', 'dev']} />
            </NavbarItem>
          </NavbarBrand>
          <NavbarEnd>
            <NavbarItem>
              <form onSubmit={this.loginUser}>
                <Field isHorizontal isHidden='mobile'>
                  <Control>
                    <Input type='text' name='username' placeholder='username'/>
                  </Control>
                  <Control>
                    <Input type='password' name='password' placeholder='password'/>
                  </Control>
                  <Control>
                    <Button type='submit' isColor='white' isOutlined>Log in</Button>
                  </Control>
                </Field>
              </form>
            </NavbarItem>
          </NavbarEnd>
        </Navbar>
        <Columns>
          <Column isSize='2/3' hasTextAlign='centered'>
            <Title isSize={1}>Devbook</Title>
            <Subtitle>A community of coders, sharing the love for what they do</Subtitle>
          </Column>
          <Column>
            <CreateUser/>
          </Column>
        </Columns>
      </div>
    );
  }
}

export default UserLogin;
