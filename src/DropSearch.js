import React, { Component } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class DropSearch extends Component {
  constructor(props) {
    super(props);

    // TODO:: Get this component to work on its own.
    this.state = {
      newTerm: '',
      prevTerms: [
        { key: 1, text: 'One', value: 'one'},
        { key: 2, text: 'Two', value: 'two'},
      ],
      key: 3,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.dropDown = this.dropDown.bind(this);
  }

  onChange(e) {
    console.log(e);
    this.setState({ newTerm: e.target.value });
  }

  onSearchChange(e, data) {
    console.log(e); console.log(data);
  }

  dropDown() {
    console.log('Toggling history view.');
    this.setState({ dropped: !this.state.dropped });
  }

  render() {
    return (
      <Dropdown 
        placeholder="Search gifs..."
        value={this.state.newTerm}
        searchQuery={this.state.newTerm}
        onChange={this.state.onChange}
        onSearchChange={this.state.onSearchChange}
        onAddItem={this.state.onSubmit}
        open={this.state.dropped}
        loading={this.state.loading}
        icon={<Icon name='search' onClick={this.dropDown} link />}
        options={this.state.prevTerms}
        search
        selection
        allowAdditions
      />
    );
  }
}

DropSearch.propTypes = {

};

export default DropSearch;