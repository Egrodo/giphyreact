import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Search from './Search';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <Container className="app" textAlign="center" fluid>
        <Header as="h1" size="large">Marvel Giphy</Header>
        <Search />
      </Container>
    );
  }
}

export default App;
