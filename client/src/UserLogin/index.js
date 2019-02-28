import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CreateUser from '../CreateUser';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, NavbarBrand, NavbarItem, NavbarEnd, Columns, Column, Field, Control, Input, Button, Subtitle, Title, Label } from 'bloomer';
import './style.css';

class UserLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      fireRedirect: false,
    }
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    this.props.loginActive(true)
  }

  componentWillUnmount() {
    this.props.loginActive(false)
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
      return <Redirect to='/posts'/>
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
          <Column isSize='2/3' id='login-large-column' hasTextAlign='centered' isHidden='mobile'>
            <Title id='login-title' isSize={1}>Devbook</Title>
            <Subtitle isSize={4}>A community of coders, sharing the love for what they do</Subtitle>
            <Subtitle isSize={4}><FontAwesomeIcon className='login-icon' icon={['fas', 'users']}/>Join an open community of developers from all backgrounds</Subtitle>
            <Subtitle isSize={4}><FontAwesomeIcon className='login-icon' icon={['fas', 'share-square']}/>Share your projects, questions or tools you found useful</Subtitle>
            <Subtitle isSize={4}><FontAwesomeIcon className='login-icon' icon={['fas', 'comments']}/>Get feedback, suggestions and tips from other users</Subtitle>
            <Subtitle isSize={4}><FontAwesomeIcon className='login-icon' icon={['fas', 'share-alt']}/>Expand your network and find partners to collaborate with</Subtitle>
          </Column>
          <Column isHidden='desktop' isHidden='tablet'>
            <form onSubmit={this.loginUser} id='mobile-login'>
              <Title>Log In</Title>
              <Field>
                <Label>Username</Label>
                <Control>
                  <Input type='text' name='username' placeholder='username'/>
                </Control>
                <Label>Password</Label>
                <Control>
                  <Input type='password' name='password' placeholder='password'/>
                </Control>
                <Control>
                  <Button id='login-btn' type='submit' isColor='link'>Log in</Button>
                </Control>
              </Field>
            </form>
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
