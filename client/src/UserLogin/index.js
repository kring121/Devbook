import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

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
    const username = this.refs.username.value;
    const password = this.refs.password.value;

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
        <form onSubmit={this.loginUser}>
          <label>Username</label>
          <input ref='username' type='' placeholder=''></input>
          <label>Password</label>
          <input ref='password' type='password' placeholder=''></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserLogin;
