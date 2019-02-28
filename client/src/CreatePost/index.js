import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import * as auth from '../AuthFunctions';
import ImagePost from '../ImagePost';
import LinkPost from '../LinkPost';
import './style.css';
import { Title, Box, Tabs, TabList, Tab, TabLink } from 'bloomer';

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

  toggleSelection(clickSelection) {
    if( clickSelection === 'img'){
      this.setState({imgOrLink: 'img'});
    } else {
      this.setState({imgOrLink: 'link'});
    }
  }

  render() {
    const { imgOrLink } = this.state;
    return (
      <div className="create-post">
        <Box hasTextAlign='centered'>
          <Title isSize={1}>Upload an Image or Link</Title>
          <Tabs>
            <TabList id='img-link-tablist'>
              <Tab onClick={() => this.toggleSelection('img')} isActive={imgOrLink === 'img' ? true : false}>
                <TabLink>Image</TabLink>
              </Tab>
              <Tab onClick={() => this.toggleSelection('link')} isActive={imgOrLink === 'img' ? false : true}>
                <TabLink>Link</TabLink>
              </Tab>
            </TabList>
          </Tabs>
          { imgOrLink === 'img' ? <ImagePost/> : <LinkPost/>}
        </Box>
      </div>
    );
  }
}

export default CreatePost;
