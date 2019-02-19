import React, { Component } from 'react';
import {Card, CardHeader, CardHeaderTitle, CardHeaderIcon, CardImage, Image, CardContent, Media, MediaLeft, MediaContent, Title, Subtitle, Content, Container, Notification, Box } from 'bloomer';
import MicrolinkCard from '@microlink/react'

class PostComponent extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { username, image, caption, previewLink, nameOfUser } = this.props;
    return(
      <Card>
        <CardHeader>
            <CardHeaderTitle>
                {username}
            </CardHeaderTitle>
        </CardHeader>
        { image === 'no-image' ?
          // <MicrolinkCard
          //   url={previewLink}
          //   size='large'
          //   screenshot='true'
          // />
          console.log('no-image')
          :
        <CardImage>
            <Image isRatio='1:1' src={image} />
        </CardImage>
        }
        <CardContent>
            <Media>
                <MediaLeft>
                    <Image isSize='48x48' src='https://via.placeholder.com/96x96' />
                </MediaLeft>
                <MediaContent>
                    <Title isSize={4}>{nameOfUser}</Title>
                    <Subtitle isSize={6}>{'@'+username}</Subtitle>
                </MediaContent>
            </Media>
            <Content>
                {caption}
                <br/>
                <small>11:09 PM - 30 October 2014</small>
            </Content>
        </CardContent>
    </Card>
    )}
}

export default PostComponent;
