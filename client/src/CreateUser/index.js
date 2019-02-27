import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Field, Input, Button, Control, Label, Title } from 'bloomer';
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
    const username = e.target.username.value;
    const nameOfUser = e.target.name.value;
    const password = e.target.password.value;
    const email = e.target.email.value;

    axios.post('/users', {
        username: username,
        name: nameOfUser,
        email: email,
        password: password,
    })
    .then(res => {
      axios.post('/users/login',{
        username: username,
        password: password
      }).then(res => sessionStorage.setItem('jwttoken', res.data.token))
    })
    .then(res => {
        this.setState({ fireRedirect: true });
    })
    .catch((error) => {
        console.log(error.response.data);
    });
  }

  render() {
    const { fireRedirect } = this.state;
    if (fireRedirect === true) {
      return <Redirect to='/create/profile'/>
    }
    return (
      <div className="create-user">
        <form onSubmit={this.createUser}>
          <Title>Sign Up</Title>
          <Field>
            <Label>Username</Label>
            <Control>
              <Input type='text' name='username' placeholder='johnsmith123' required/>
            </Control>
            <Label>Name</Label>
            <Control>
              <Input type='text' name='name' placeholder='John Smith' required/>
            </Control>
            <Label>Email</Label>
            <Control>
              <Input type='email' name='email' placeholder='johnsmith@email.com' required/>
            </Control>
            <Label>Password</Label>
            <Control>
              <Input type='password' name='password' placeholder='password' required/>
            </Control>
            <Control id='signup-btn'>
              <Button type='submit' isColor='success'>Sign Up</Button>
            </Control>
          </Field>
        </form>
      </div>
    );
  }
}

export default CreateUsers;
