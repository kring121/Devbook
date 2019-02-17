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
      liked: false,
      previewLink: {},
    }
    this.fetchLinkPreview = this.fetchLinkPreview.bind(this);
  }
  componentDidMount(){
    auth.setHeader();
    axios.get('/posts')
      .then(res => res.data)
      .then(posts => this.setState({posts: posts}));
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
    if(this.state.liked === true){
      axios.delete('/likes/'+postId)
      .then(
        this.setState({
          liked: false,
        })
      )
    } else {
      axios.post('/likes', {
        post_id: postId
      })
      .then(
        this.setState({
          liked: false,
        })
      )
    }
  }

  fetchLinkPreview(postLink){
    let imageLink = '';
    axios.get(`http://api.linkpreview.net/?key=${process.env.REACT_APP_LINK_PREVIEW_KEY}&q=${postLink}`)
    .then( res => this.setState({ previewLink: res.data}))
    .catch( err => console.log(err));
    // console.log(imageLink)
  }
  render() {
    const { posts, comments, viewComments, previewLink } = this.state;
    return (
      <div className="posts">
        {posts.map((post) =>
          <div className='post' key={'post-' + post.id}>
            <PostComponent username={post.user.username} caption={post.caption} image={post.image !== null ? post.image : this.fetchLinkPreview('www.google.com')}/>
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
