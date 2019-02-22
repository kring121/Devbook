import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import PostComponent from '../PostComponent';
import Searchbar from '../Searchbar';
import Dashboard from '../Dashboard';
import MobileDashboard from '../MobileDashboard';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Columns, Column, Title, Field, Control, Input, Button, Box, Menu, MenuList, MenuLink } from 'bloomer';

class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      searchbar: false,
      searchUser: '',
      possibleSearch: []
    }
  this.searchBar = this.searchBar.bind(this);
  this.searchUser = this.searchUser.bind(this);
  this.dataSearch = this.dataSearch.bind(this);
  this.suggestedUsers = this.suggestedUsers.bind(this);
  }
  componentDidMount(){
    auth.setHeader();
    axios.get('/posts')
      .then(res => res.data)
      .then(posts => this.setState({posts: posts}));
    axios.get('/check/likes')
      .then(res => res.data)
      .then(likes => this.setState({liked: likes}))
      .catch(err => console.log(err));
  }

  fetchComments(postId){
    axios.get('/comments/'+postId)
      .then(res => res.data)
      .then(comments => this.setState({comments: comments}));
    if(this.state.viewComments === false){
      this.setState({
        viewComments: true
      })
    } else {
      this.setState({
        viewComments: false
      })
    }
  }

  fillLikes(postId){
    const { liked } = this.state;
    const likeStyle = {
      color: 'red'
    };
    for(let i = 0; i < liked.length; i++){
      if(liked[i].post_id === postId){
        return likeStyle
      }
    }
  }

  handleComment(e, postId){
    e.preventDefault()

    const comment = e.target.comment.value
    axios.post('/comments', {
      content: comment,
      post_id: postId
    })
    .then(e.target.reset())
  }

  handleLike(postId){
    const { liked } = this.state;
    let arrayCopy = liked.slice();
    if(liked.every(function(element){return element.post_id !== postId})){
      axios.post('/likes', {
        post_id: postId
      })
      .then(res => res.data)
      .then(newLike => this.setState(prevState => ({
        liked: [...prevState.liked, newLike]
      })))
    } else {
      const index = liked.findIndex(function(element){return element.post_id === postId});
      axios.delete('/likes/'+postId)
        .then( arrayCopy.splice(index, 1))
        .then( this.setState({ liked: arrayCopy}));
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

  render() {
    const { posts, searchbar, possibleSearch } = this.state;
    return (
      <div>
        <Columns>
        <MobileDashboard searchBar={this.searchBar}/>
          <Column isSize={{desktop:'3/4', mobile: 'full', tablet: '3/4'}}>

            <Searchbar searchbar={searchbar} possibleSearch={possibleSearch} searchUser={this.searchUser} suggestedUsers={this.suggestedUsers}/>
          <div className="posts">
            {posts.map((post) =>
              <div className='post' key={'post-' + post.id}>
                <PostComponent username={post.user.username} caption={post.caption} image={post.image !== null ? post.image : 'no-image'} previewLink={post.link} nameOfUser={post.user.name} postId={post.id} userId={post.user_id}/>
              </div>
            )}
          </div>
          </Column>
          <Dashboard searchBar={this.searchBar}/>
        </Columns>
      </div>
    );
  }
}

export default Posts;
