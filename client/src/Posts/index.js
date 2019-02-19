import React, { Component } from 'react';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import PostComponent from '../PostComponent';
import './style.css';

class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      comments: [],
      viewComments: false,
      liked: [],
      previewLink: {},
    }
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

  handleComment(e, postId){
    e.preventDefault()

    const comment = this.refs.comment.value;
    axios.post('/comments', {
      content: comment,
      post_id: postId
    })
    .then(e.target.reset())
  }

  handleLike(postId){
    const { liked } = this.state;
    const myLikes = liked.map( like => like.post_id);

    for( let i = 0; i < myLikes.length; i++){
      if( myLikes[i] === postId){
        axios.delete('/likes/'+postId)
      } else {
        axios.post('/likes', {
          post_id: postId
        })
      }
    }
  }

  render() {
    const { posts, comments, viewComments, previewLink } = this.state;
    return (
      <div className="posts">
        {posts.map((post) =>
          <div className='post' key={'post-' + post.id}>
            <PostComponent username={post.user.username} caption={post.caption} image={post.image !== null ? post.image : 'no-image'} previewLink={post.link} nameOfUser={post.user.name}/>
            <button onClick={() => this.handleLike(post.id)}>Like</button>
            <p onClick={() => this.fetchComments(post.id)}>{ viewComments ? 'Hide Comments' : 'View Comments' }</p>
            { viewComments ?
              comments.map((comment) =>
              <div className='comment' key={'comment'+comment.id}>
                <h4>{comment.user.username}</h4>
                <p>{comment.content}</p>
              </div>)
              : null }
            <form onSubmit={(e) => this.handleComment(e, post.id)}>
              <textarea ref='comment'/>
              <button type='submit'>Submit</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Posts;
