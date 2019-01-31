import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.createUser = this.createUser.bind(this)
  }

  createUser(e) {
    e.preventDefault();
    const userId = this.refs.id.value;
    const username = this.refs.username.value;
    const nameOfUser = this.refs.name.value;
    // console.log(userId, username, nameOfUser);

    axios.post('/users', {
        id: userId,
        username: username,
        name: nameOfUser
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="create-user">
        <form onSubmit={this.createUser}>
          <label>Id</label>
          <input ref='id' type='' placeholder=''></input>
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
