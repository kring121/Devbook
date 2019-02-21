import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Control, Input, Button, Title, Subtitle } from 'bloomer';

class LikeComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      comments: [],
      viewComments: false,
      liked: [],
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

  fillLikes(postId){
    const { liked } = this.state;
    const likeStyle = {
      color: 'crimson'
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
    const { comments, viewComments } = this.state;
    const { postId } = this.props;
    return (
      <div className="like-comment">
        <FontAwesomeIcon icon={['fas', 'heart']} onClick={() => this.handleLike(postId)} style={this.fillLikes(postId)}/>
        <p onClick={() => this.fetchComments(postId)}>{ viewComments ? 'Hide Comments' : 'View Comments' }</p>
        { viewComments ?
          comments.map((comment) =>
          <div className='comment' key={'comment'+comment.id}>
            <Title isSize={6}><Link className='username-link' to={'/users/' + comment.user_id}>{comment.user.username}</Link></Title>
            <Subtitle className='comment-content' isSize={6}>{comment.content}</Subtitle>
          </div>)
          : null }
        <form onSubmit={(e) => this.handleComment(e, postId)}>
          <Field>
            <Control className='comment-control'>
              <Input name='comment'/>
              <Button type='submit' isColor='link'>Post</Button>
            </Control>
          </Field>
        </form>
      </div>
    );
  }
}

export default LikeComment;
