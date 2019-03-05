import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LikeComment from '../LikeComment';
import {Card, CardHeader, CardHeaderTitle, CardImage, Image, CardContent, Media, MediaLeft, MediaContent, Title, Subtitle, Content, Delete } from 'bloomer';
import MicrolinkCard from '@microlink/react'

class PostComponent extends Component {
  handleDelete(postId) {
    // const { removePost } = this.props
    // removePost(postId);
    axios.delete('/posts/'+postId)
    .catch(err => console.log(err.response.data))
  }
  render() {
    const { username, image, caption, previewLink, nameOfUser, postId, userId, currentUser } = this.props;
    return(
      <Card>
        <CardHeader>
            <CardHeaderTitle>
                <Link className='username-link' to={{pathname:'/users/'+userId, hash:'#'}}>{username}</Link>
            </CardHeaderTitle>
            {currentUser === userId ? <Delete isSize='medium' onClick={() => this.handleDelete(postId)}/> : null}
        </CardHeader>
        { image === 'no-image' ?
          <MicrolinkCard
            url={previewLink}
            size='large'
            screenshot='true'
          />
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
                    <Subtitle isSize={6}><Link className='username-link' to={'/users/'+userId}>{'@'+username}</Link></Subtitle>
                </MediaContent>
            </Media>
            <Content>
                {caption}
                <br/>
                <small>11:09 PM - 30 October 2014</small>
                <LikeComment postId={postId}/>
            </Content>
        </CardContent>
    </Card>
    )}
}

export default PostComponent;
