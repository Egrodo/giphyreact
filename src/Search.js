import React, { Component } from 'react';
import { Container, Form } from 'semantic-ui-react';
import ImgContainer from './ImgContainer';
import axios from 'axios';
import './css/Search.css';

class Search extends Component {
  constructor() {
    super();
    
    this.state= {
      term: 'test',
      newTerm: '',
      loading: false,
      imgData: false,
      i: 0,
      offset: 5,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.turn = this.turn.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.turn, false);
  }

  onChange(e) {
    this.setState({ newTerm: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    
    const term = this.state.newTerm.replace(/[^\w\d\s]/g, '');
    this.setState({ term, loading: true });

    const res = await axios(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=Ff0QfFPN2LB3Y1biNflQAV1K5AHio8gW&limit=6`);
    if (res.status === 200) {
      this.setState({ imgData: res.data.data, loading: false, i: 0, offset: 5 });
    } else {
      // TODO: Handle error.
    }
  }

  async loadMore() {
    // BUG: 5 and 6 are the same ? Something to do with the offset and limit.
    this.setState({ loading: true });
    const call = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=Ff0QfFPN2LB3Y1biNflQAV1K5AHio8gW&limit=5&offset=${this.state.offset}`;
    const res = await axios(call);
    if (res.status === 200) {
      this.setState({ imgData: [...this.state.imgData, ...res.data.data], loading: false, offset: this.state.offset+5 });
    } else {
      console.error(res.error);
    }
  }

  turn(e) {
    // Handle incrementing / decrementing with either keys or arrow clicks.
    // TODO: I want it to switch to the (loading) preview as soon as turned.
    if (e.type === 'click') {
      if (e.target.classList.contains('left')) {
        if (this.state.i > 0) this.setState({ i: this.state.i-1 });
      } else if (e.target.classList.contains('right')) {
        if (this.state.i < this.state.offset) {
          this.setState({ i: this.state.i+1 });
        } else this.loadMore();
      }
    } else if (e.type === 'keydown') {
      if (!this.state.imgData) return;
      // ^ TODO: Don't let step if more posts haven't finished loading yet.
      if (this.state.imgData.length < this.state.offset) return;
      if (e.key === 'ArrowLeft' && this.state.i > 0) {
        this.setState({ i: this.state.i-1 });
      } else if (e.key === 'ArrowRight' && this.state.i < this.state.offset) {
        this.setState({ i: this.state.i+1 });
      } else if (this.state.i === this.state.offset) this.loadMore();
    }
  }

  render() {
    return (
      <Container fluid>
        <Form onSubmit={this.onSubmit}>
          <Form.Field className="searchBar">
            <Form.Input 
              placeholder="Search gifs..."
              autoComplete="off"
              name="search"
              value={this.state.newTerm}
              onChange={this.onChange}
              loading={this.state.loading}
              fluid
            />
          </Form.Field>
        </Form>
        { this.state.imgData ? <ImgContainer data={this.state.imgData[this.state.i]} turn={this.turn} loading={this.loading} /> : '' }
      </Container>
    );
  }
}

export default Search;