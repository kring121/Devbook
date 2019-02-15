import React, { Component } from 'react';
import axios from 'axios';
import * as auth from '../AuthFunctions';

class LinkPost extends Component {
  constructor(props){
    super(props);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    auth.setHeader();
  }
  createPost(e) {
    e.preventDefault();
    e.persist();
    // const file = e.target[0].files[0];
    const caption = this.refs.caption.value;
    const link = this.refs.link.value;
    const github = this.refs.github.value;

    axios.post('/posts', {
        caption: caption,
        link: link,
        github: github,
    }).catch(err => console.log(err.response.data))
  }
  render() {
    return (
      <div className="link-post">
        <form onSubmit={this.createPost} encType='multipart/form-data'>
          <label>Link</label>
          <input ref='link' type='text'/>
          <label>Github</label>
          <input ref='github' type='text'/>
          <label>Caption</label>
          <input type='text' ref='caption'/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default LinkPost;
