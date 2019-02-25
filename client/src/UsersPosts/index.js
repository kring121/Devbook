import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import PostComponent from '../PostComponent';
import Searchbar from '../Searchbar';
import Dashboard from '../Dashboard';
import MobileDashboard from '../MobileDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Columns, Column, Title, Field, Control, Input, Button, Box, Menu, MenuList, MenuLink } from 'bloomer';

class UsersPosts extends Component {
  constructor(props){
    super(props);
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

  render() {
    const { posts, userId, username, nameOfUser } = this.props;
    return (
      <div>
        <div className="posts">
            {posts.reverse().map((post) =>
              <div className='post' key={'post-' + post.id}>
                <PostComponent username={username} caption={post.caption} image={post.image !== null ? post.image : 'no-image'} previewLink={post.link} nameOfUser={nameOfUser} postId={post.id} userId={userId}/>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default UsersPosts;
