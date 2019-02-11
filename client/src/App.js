import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import UserLogin from './UserLogin';
import Users from './Users';
import UserProfile from './UserProfile';
import CreateUser from './CreateUser';
import CreatePost from './CreatePost';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={UserLogin}/>
            <Route exact path='/users' component={Users}/>
            <Route exact path='/create/user' component={CreateUser}/>
            <Route exact path='/users/:userId' component={UserProfile}/>
            <Route exact path='/create/post' component={CreatePost}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
