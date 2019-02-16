import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import UserLogin from './UserLogin';
import Users from './Users';
import Posts from './Posts';
import UserProfile from './UserProfile';
import CreateUser from './CreateUser';
import CreatePost from './CreatePost';
import CustomNav from './CustomNav';
import * as auth from './AuthFunctions';
import 'bulma/css/bulma.css';
import './style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {fab} from "@fortawesome/free-brands-svg-icons";
import { faIgloo, faUserCircle, faSearch, faSignOutAlt , faEdit} from '@fortawesome/free-solid-svg-icons';
library.add(faIgloo, fab, faUserCircle, faSearch, faSignOutAlt, faEdit);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <CustomNav/>
          <Switch>
            <Route exact path='/' component={UserLogin}/>
            <Route exact path='/users' component={Users}/>
            <Route exact path='/create/user' component={CreateUser}/>
            <Route exact path='/users/:userId' component={UserProfile}/>
            <Route exact path='/posts' component={Posts}/>
            <Route exact path='/create/post' component={CreatePost}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
