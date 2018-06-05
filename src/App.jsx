import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Search from './Search';
import Trending from './Trending';
import './css/App.css';

const App = () => {
  return (
    <Container className="app" textAlign="center" fluid>
      <div>
        <Header as="h1" size="large">Marvel Giphy</Header>
        <Search />
      </div>
      <Trending />
    </Container>
  );
}

export default App;
