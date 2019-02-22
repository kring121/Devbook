import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Columns, Column, Title, Field, Control, Input, Button, Box, Menu, MenuList, MenuLink } from 'bloomer';

class Searchbar extends Component {
  render() {
    const { searchbar, possibleSearch, searchUser, suggestedUsers } = this.props
    return (
      <div>
        { searchbar ?
        <form autoComplete='off'>
          <Field isHorizontal className='searchbar'>
            <Control className='search-input'>
              <Input onChange={searchUser} type='text' name='search' placeholder='Find user'/>
            </Control>
            <Control>
              <Button isColor='primary'>Search</Button>
            </Control>
          </Field>
        </form>
          : null}
          {possibleSearch.length !== 0 ? suggestedUsers() : null}
      </div>
    );
  }
}

export default Searchbar;
