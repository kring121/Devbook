import React, { Component } from 'react';
import {Card, CardHeader, CardHeaderTitle, CardHeaderIcon, CardImage, Image, CardContent, Media, MediaLeft, MediaContent, Title, Subtitle, Content} from 'bloomer';

class PostComponent extends Component {
  render() {
    const { username, image, caption} = this.props;
    return(
      <Card>
        <CardHeader>
            <CardHeaderTitle>
                {username}
            </CardHeaderTitle>
        </CardHeader>
        <CardImage>
            <Image isRatio='1:1' src={image} />
        </CardImage>
        <CardContent>
            <Media>
                <MediaLeft>
                    <Image isSize='48x48' src='https://via.placeholder.com/96x96' />
                </MediaLeft>
                <MediaContent>
                    <Title isSize={4}>John Wick</Title>
                    <Subtitle isSize={6}>@John Wick</Subtitle>
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
