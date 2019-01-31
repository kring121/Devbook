import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }
  componentDidMount(){
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users: users.users}));
  }
  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <ul>
          {users.map(user => <li key={user.id}>{user.username}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
