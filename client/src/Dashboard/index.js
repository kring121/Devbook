import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Columns, Column, Title, Field, Control, Input, Button, Box, Menu, MenuList, MenuLink } from 'bloomer';

class Dashboard extends Component {

  render() {
    const { searchBar } = this.props;
    return (
      <Column className='dashboard' isHidden='mobile' hasTextAlign='centered'>
        <div className='dashboard-icons'>
          <FontAwesomeIcon icon={['fas', 'home']}/>
          <FontAwesomeIcon onClick={searchBar} icon={['fas', 'search']}/>
          <FontAwesomeIcon icon={['fas', 'plus-square']}/>
          <FontAwesomeIcon icon={['fas', 'user']}/>
        </div>
      </Column>
    );
  }
}

export default Dashboard;
