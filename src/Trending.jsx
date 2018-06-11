import React, { Component } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import axios from 'axios';
import TrendingImg from './reusables/TrendingImg';
import './css/Trending.css';

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: [],
      offset: 0,
    };

    this.onScroll = this.onScroll.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  async componentDidMount() {
    // TODO: Dynamically calculate limit based on screen size.
    const limit = 12;
    const call = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=${limit}`;
    const res = await axios(call);
    if (res.status === 200) {
      this.setState({
        imgData: res.data.data,
        offset: limit,
      });
    } else console.error(res.error);
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    // Handle page scroll for infinite gifs.
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) this.loadMore();
  }

  async loadMore() {
    // Load more and append to bottom of list.
    const call = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=12&offset=${this.state.offset}`;
    const res = await axios(call);
    if (res.status === 200) {
      this.setState({
        imgData: [...this.state.imgData, ...res.data.data],
        offset: this.state.offset + 12,
      });
    } else console.error(res.error);
  }

  render() {
    return (
      <Container className="trending">
        <Header as="h4">Trending</Header>
        <Grid
          verticalAlign="middle"
          columns={4}
          stackable
          doubling
          container
        >
          { this.state.imgData.map(val => <TrendingImg data={val} key={`${val.id}`} />) }
        </Grid>
      </Container>
    );
  }
}

export default Trending;
