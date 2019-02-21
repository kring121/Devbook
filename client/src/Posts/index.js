import React, { Component } from 'react';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import PostComponent from '../PostComponent';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Columns, Column, Title, Field, Control, Input, Button } from 'bloomer';

class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      searchbar: false,
    }
  this.searchBar = this.searchBar.bind(this);
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

  render() {
    const { posts, searchbar } = this.state;
    return (
      <div>
        <Columns>
        <Column isSize={{desktop:'3/4', mobile: 'full', tablet: '3/4'}}>
          { searchbar ? <Field isHorizontal className='searchbar'>
            <Control className='search-input'>
              <Input type='text' placeholder='Find user'/>
            </Control>
            <Control>
              <Button isColor='primary'>Search</Button>
            </Control>
          </Field> : null}
        <div className="posts">
          {posts.map((post) =>
            <div className='post' key={'post-' + post.id}>
              <PostComponent username={post.user.username} caption={post.caption} image={post.image !== null ? post.image : 'no-image'} previewLink={post.link} nameOfUser={post.user.name} postId={post.id} userId={post.user_id}/>
            </div>
          )}
        </div>
        </Column>
        <Column className='dashboard' isHidden='mobile' hasTextAlign='centered'>
          <div className='dashboard-icons'>
            <FontAwesomeIcon icon={['fas', 'home']}/>
            <FontAwesomeIcon onClick={this.searchBar} icon={['fas', 'search']}/>
            <FontAwesomeIcon icon={['fas', 'plus-square']}/>
            <FontAwesomeIcon icon={['fas', 'user']}/>
          </div>
        </Column>
        </Columns>
      </div>
    );
  }
}

export default Posts;
