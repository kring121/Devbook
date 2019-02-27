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
import Searchbar from './Searchbar';
import Dashboard from './Dashboard';
import LogOut from './LogOut';
import MobileDashboard from './MobileDashboard';
import CreateProfile from './CreateProfile';
import EditProfile from './EditProfile';
import * as auth from './AuthFunctions';
import 'bulma/css/bulma.css';
import './style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Columns, Column, Title, Field, Control, Input, Button, Box, Menu, MenuList, MenuLink } from 'bloomer';
import {fab} from "@fortawesome/free-brands-svg-icons";
import { faIgloo, faUserCircle, faSearch, faSignOutAlt , faEdit, faHeart, faUpload, faHome, faPlusSquare, faUser, faUsers, faComments, faShareSquare, faShareAlt, faDesktop } from '@fortawesome/free-solid-svg-icons';
library.add(faIgloo, fab, faUserCircle, faSearch, faSignOutAlt, faEdit, faHeart, faUpload, faHome, faPlusSquare, faUser, faUsers, faComments, faShareSquare, faShareAlt, faDesktop);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchbar: false,
      searchUser: '',
      possibleSearch: [],
      userInfo: {},
      logout: false,
      login: false,
      redirectToLogin: false
    }
  this.searchBar = this.searchBar.bind(this);
  this.searchUser = this.searchUser.bind(this);
  this.dataSearch = this.dataSearch.bind(this);
  this.suggestedUsers = this.suggestedUsers.bind(this);
  this.launchModal = this.launchModal.bind(this);
  this.loginActive = this.loginActive.bind(this);
  this.fireRedirect = this.fireRedirect.bind(this);
  }

  componentDidMount(){
    auth.setHeader();
    axios.get('/check')
    .then(res => res.data)
    .then(userInfo => this.setState({userInfo: userInfo}))
    .catch(err => this.fireRedirect(err.response.status))
  }

  fireRedirect(status){
    if(status === 403) {
      this.setState({
        redirectToLogin: true
      })
    }
  }

  searchBar(){
    const { searchbar } = this.state;

    if( searchbar === false) {
      this.setState({searchbar: true})
    } else {
      this.setState({searchbar: false})
    }

  }

  searchUser(e){
    this.setState({searchUser: e.target.value}, this.dataSearch)
  }

  dataSearch() {
    const { searchUser } = this.state;
    axios.get(`/search/${searchUser}`)
      .then(res => res.data)
      .then(result => this.setState({possibleSearch: result}))
      .catch(err => this.setState({possibleSearch: []}));
  }

  suggestedUsers() {
    const { possibleSearch } = this.state;
    return(
      <Box id='search-box'>
        <Menu>
          <MenuList>
            {possibleSearch.map(user =>
              <li><MenuLink href={'/users/'+user.id}>{user.username}</MenuLink></li>
            )}
          </MenuList>
        </Menu>
      </Box>
    )
  }

  launchModal() {
    const { logout } = this.state;
    if ( logout === false) {
      this.setState({logout: true})
    } else {
      this.setState({logout: false})
    }
  }

  loginActive(trueOrFalse) {
    this.setState({login: trueOrFalse});
  }

  render() {
    const { searchbar, possibleSearch, userInfo, logout, login, redirectToLogin } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          { redirectToLogin ? auth.redirectToLogin() : null }
          { login ? null : <CustomNav launchModal={this.launchModal}/> }
          <Switch>
            <Route exact path='/' render={() => <UserLogin loginActive={this.loginActive}/>}/>
            <Route exact path='/create/user' component={CreateUser}/>
            <Route exact path='/users' component={Users}/>
            <Route exact path='/create/profile' component={CreateProfile}/>
            <Columns>
              {logout === true ? <LogOut launchModal={this.launchModal}/> : null}
              <MobileDashboard searchBar={this.searchBar}/>
              <Column isSize={{desktop:'3/4', mobile: 'full', tablet: '3/4'}} className='large-column'>
                <Searchbar searchbar={searchbar} possibleSearch={possibleSearch} searchUser={this.searchUser} suggestedUsers={this.suggestedUsers}/>
                <Route exact path='/users/:userId' component={UserProfile}/>
                <Route exact path='/posts' component={Posts}/>
                <Route exact path='/create/post' component={CreatePost}/>
                <Route exact path='/edit/profile' component={EditProfile}/>
              </Column>
              <Dashboard searchBar={this.searchBar}/>
            </Columns>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
