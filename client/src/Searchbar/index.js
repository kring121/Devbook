import React, { Component } from 'react';
import { Field, Control, Input, Button } from 'bloomer';

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
