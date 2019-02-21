import React, { Component } from 'react';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import { Field, Control, Input, Label, Button } from 'bloomer';

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
    const caption = e.target.caption.value;
    const link = e.target.link.value;
    const github = e.target.github.value;

    axios.post('/posts', {
        caption: caption,
        link: link,
        github: github,
    }).catch(err => console.log(err.response.data))
  }
  render() {
    return (
      <div className="link-post">
        <form onSubmit={this.createPost}>
          <Field>
            <Label>Link</Label>
            <Control>
              <Input name='link' type='url' pattern="https?://.+"/>
            </Control>
            <Label>Github</Label>
            <Control>
              <Input name='github' type='url' pattern="https?://.+"/>
            </Control>
            <Label>Caption</Label>
            <Control>
              <Input name='caption' type='text'/>
            </Control>
            <br/>
            <Control id='submit-link'>
              <Button type='submit' isColor='primary'>Submit</Button>
            </Control>
          </Field>
        </form>
      </div>
    );
  }
}

export default LinkPost;
