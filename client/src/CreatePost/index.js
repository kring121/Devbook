import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import S3FileUpload from 'react-s3';
import * as auth from '../AuthFunctions';

class CreatePost extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    auth.setHeader();
  }
  createPost(e) {
    const config = {
      bucketName: 'fullstack-app',
      dirName: 'photos',
      region: 'us-east-1',
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY
    }
    e.preventDefault();
    e.persist();
    const file = e.target[0].files[0];
    const caption = this.refs.caption.value;

    S3FileUpload
    .uploadFile(file, config)
    .then(data => {
      const imageSource = data.location;
      axios.post('/posts', {
        image: imageSource,
        caption: caption,
      }).catch(err => console.log(err.response.data))
    })

  }

  render() {
    return (
      <div className="create-post">
        <form onSubmit={this.createPost} encType='multipart/form-data'>
          <label>Upload Image</label>
          <input type='file'/>
          <input type='text' ref='caption'/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default CreatePost;
