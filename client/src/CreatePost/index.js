import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import ImagePost from '../ImagePost';
import LinkPost from '../LinkPost';
import './style.css';

class CreatePost extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgOrLink: 'img',
    }
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  componentDidMount() {
    auth.setHeader();
  }

  toggleSelection() {
    const { imgOrLink } = this.state;
    if( imgOrLink === 'img'){
      this.setState({imgOrLink: 'link'});
    } else {
      this.setState({imgOrLink: 'img'});
    }
  }

  render() {
    const { imgOrLink } = this.state;
    return (
      <div className="create-post">
        <button onClick={this.toggleSelection}>{ imgOrLink === 'img' ? 'Link' : 'Image'}</button>
        { imgOrLink === 'img' ? <ImagePost/> : <LinkPost/>}
      </div>
    );
  }
}

export default CreatePost;
