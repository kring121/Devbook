import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, ModalBackground, ModalContent, ModalClose, Title, Button, Box } from 'bloomer';
class LogOut extends Component {
  constructor(props){
    super(props);
    this.state = {
      fireRedirect: false,
    }
    this.logOutUser = this.logOutUser.bind(this);
  }

  logOutUser(){
    sessionStorage.removeItem('jwttoken')
    this.setState({fireRedirect: true});
  }

  render() {
    const { fireRedirect } = this.state;
    const { launchModal } = this.props;
    if (fireRedirect === true) {
      return <Redirect to='/'/>
    }
    return (
      <Modal isActive>
        <ModalBackground/>
        <ModalContent>
          <Box hasTextAlign='centered'>
            <Title>Are you sure you want to logout?</Title>
            <div id='logout-btns'>
              <Button isColor='success' onClick={this.logOutUser}>Yes</Button>
              <Button isColor='danger' onClick={launchModal}>No</Button>
            </div>
          </Box>
        </ModalContent>
        <ModalClose onClick={launchModal}/>
      </Modal>
    );
  }
}

export default LogOut;
