import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ImagePost from '../ImagePost';
import { Field, Input, Button, Control, Label, Title, Box , Container, Modal, ModalContent, ModalBackground, ModalClose } from 'bloomer';
import axios from 'axios';
import * as auth from '../AuthFunctions';
import './style.css';

class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      fireRedirect: false,
      deleteAccount: false,
      loginRedirect: false
    }
    this.editProfile = this.editProfile.bind(this);
    this.launchModal = this.launchModal.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount(){
    auth.setHeader()
  }

  editProfile(e) {
    e.preventDefault();
    const bio = (e.target.bio.value === '' ? null : e.target.bio.value);
    const github = (e.target.github.value === '' ? null : e.target.github.value);
    const codepen = (e.target.codepen.value === '' ? null : e.target.github.value);
    const linkedin = (e.target.linkedin.value === '' ? null : e.target.linkedin.value);
    const website = (e.target.website.value === '' ? null : e.target.website.value);

    axios.put('/profile', {
        bio: bio,
        github: github,
        codepen: codepen,
        linkedin: linkedin,
        website: website
      })
      .then(() => {
        this.setState({ fireRedirect: true });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  deleteAccount(){
    axios.delete('/profile')
    .then(() =>{
      sessionStorage.removeItem('jwttoken');
      this.setState({ loginRedirect: true });
    })
  }

  launchModal() {
    const { deleteAccount } = this.state;
    if ( deleteAccount === false) {
      this.setState({deleteAccount: true})
    } else {
      this.setState({deleteAccount: false})
    }
  }

  render() {
    const { fireRedirect, deleteAccount, loginRedirect } = this.state;
    if (fireRedirect === true) {
      return <Redirect to='/posts'/>
    } else if (loginRedirect === true){
      return <Redirect to='/'/>
    }
    return (
      <div className="edit-profile">
        <Box id='edit-profile-box'>
          <form onSubmit={this.editProfile}>
            <Title>Edit Profile</Title>
            <Field>
              <Label>Bio</Label>
              <Control>
                <Input type='text' name='bio'/>
              </Control>
              <Label>Github</Label>
              <Control>
                <Input name='github' type='url' pattern="https?://.+"/>
              </Control>
              <Label>Codepen</Label>
              <Control>
                <Input name='codepen' type='url' pattern="https?://.+"/>
              </Control>
              <Label>LinkedIn</Label>
              <Control>
                <Input name='linkedin' type='url' pattern="https?://.+"/>
              </Control>
              <Label>Personal Website</Label>
              <Control>
                <Input name='website' type='url' pattern="https?://.+"/>
              </Control>
              <Control id='signup-btn'>
                <Button type='submit' isColor='success'>Submit</Button>
              </Control>
            </Field>
          </form>
        </Box>
        <Container id='delete-container'>
          <Button isColor='danger' onClick={this.launchModal}>Delete Account</Button>
        </Container>
        <Modal isActive={deleteAccount ? true : false}>
          <ModalBackground/>
          <ModalContent>
            <Box hasTextAlign='centered'>
              <Title>Are you sure you want to delete your account?</Title>
              <div id='logout-btns'>
                <Button isColor='success' onClick={this.deleteAccount}>Yes</Button>
                <Button isColor='danger' onClick={this.launchModal}>No</Button>
              </div>
            </Box>
          </ModalContent>
          <ModalClose onClick={this.launchModal}/>
        </Modal>
      </div>
    );
  }
}

export default EditProfile;
