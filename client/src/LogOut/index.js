import React, { Component } from 'react';
class LogOut extends Component {
  constructor(props){
    super(props);
    this.state = {
      fireRedirect: false,
    }
    this.logOutUser = this.logOutUser.bind(this);
  }

  logOutUser(){
    sessionStorage.removeItem('jwttoken');
  }

  render() {
    const { fireRedirect } = this.state;
    if (fireRedirect === true) {
      return <Redirect to='/'/>
    }
    return (
      <div className="logout">
        <h1>Are you sure you want to logout?</h1>
        <button onClick={this.logOutUser}>Yes</button>
        <button>No</button>
      </div>
    );
  }
}

export default LogOut;
