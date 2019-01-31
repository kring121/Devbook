import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Users from './Users';
import UserProfile from './UserProfile';
import CreateUser from './CreateUser';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/users' component={Users}/>
            <Route exact path='/create/user' component={CreateUser}/>
            <Route exact path='/users/:userId' component={UserProfile}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
