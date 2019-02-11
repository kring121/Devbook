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

    axios.post('/users', {
        username: username,
        name: nameOfUser
      })
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
      <div className="create-user">
        <form onSubmit={this.createUser}>
          <label>Username</label>
          <input ref='username' type='' placeholder=''></input>
          <label>Name</label>
          <input ref='name' type='' placeholder=''></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateUsers;
