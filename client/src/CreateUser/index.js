import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class CreateUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      fireRedirect: false,
    }
    this.createUser = this.createUser.bind(this);
  }

  createUser(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const nameOfUser = this.refs.name.value;
    const password = this.refs.password.value;
    const email = this.refs.email.value;

    axios.post('/users', {
        username: username,
        name: nameOfUser,
        email: email,
        password: password,
      })
      .then(() => {
        this.setState({ fireRedirect: true });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  render() {
    const { fireRedirect } = this.state;
    if (fireRedirect === true) {
      return <Redirect to='/users'/>
    }
    return (
      <div className="create-user">
        <form onSubmit={this.createUser}>
          <label>Username</label>
          <input ref='username'></input>
          <label>Name</label>
          <input ref='name'></input>
          <label>Email</label>
          <input ref='email' type='email'></input>
          <label>Password</label>
          <input ref='password' type='password'></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateUsers;
