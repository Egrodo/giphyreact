import React, { Component } from 'react';
import { Container, Form, Icon } from 'semantic-ui-react';
import axios from 'axios';
import SearchImg from './reusables/SearchImg';
import './css/Search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      term: '',
      newTerm: '',
      loading: false,
      focused: false,
      imgData: [],
      i: 0,
      offset: 5,
    };

    this.turn = this.turn.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.hideSearched = this.hideSearched.bind(this);
  }

  componentDidMount() {
    // Allow for arrow key image navigation.
    document.addEventListener('keydown', this.turn, false);
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  onChange(e) {
    this.setState({ newTerm: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    const term = this.state.newTerm.replace(/[^\w\d\s]/g, '');
    this.setState({ term, loading: true });
    const call = `https://api.giphy.com/v1/gifs/search?q=${term}&api_key=${process.env.REACT_APP_API_KEY}&limit=6`;
    const res = await axios(call);
    if (res.status === 200) {
      this.setState({
        imgData: res.data.data,
        loading: false,
        i: 0,
        offset: 5,
      });
    } else console.error(res.error);
  }

  async loadMore() {
    this.setState({ loading: true });
    const call = `https://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${process.env.REACT_APP_API_KEY}&limit=5&offset=${this.state.offset + 1}`;
    const res = await axios(call);
    if (res.status === 200) {
      this.setState({
        imgData: [...this.state.imgData, ...res.data.data],
        loading: false,
        i: this.state.i + 1,
        offset: this.state.offset + 5,
      });
    } else console.error(res.error);
  }

  turn(e) {
    // Handle incrementing / decrementing with either keys or arrow clicks.
    if (e.type === 'click') {
      if (e.target.classList.contains('left')) {
        if (this.state.i > 0) this.setState({ i: this.state.i - 1 });
      } else if (e.target.classList.contains('right')) {
        if (this.state.i < this.state.offset) {
          this.setState({ i: this.state.i + 1 });
        } else this.loadMore();
      }
    } else if (e.type === 'keydown') {
      // Ignore if: no data / input box is focused, or we're ahead of the offset.
      if (!this.state.imgData || this.state.focused) return;
      if (this.state.imgData.length < this.state.offset) return;

      if (e.key === 'ArrowLeft') {
        if (this.state.i > 0) {
          this.setState({ i: this.state.i - 1 });
        }
      } else if (e.key === 'ArrowRight') {
        if (this.state.i < this.state.offset) {
          this.setState({ i: this.state.i + 1 });
        } else this.loadMore();
      }
    } else console.error(`Unrecognized event type: ${e.type}.`);
  }

  hideSearched() {
    this.setState({
      term: '',
      newTerm: '',
      imgData: [],
      i: 0,
      offset: 5,
      loading: false,
    });
  }

  render() {
    return (
      <Container fluid>
        <Form onSubmit={this.onSubmit}>
          <Form.Field className="search-input">
            <h4>Search</h4>
            <Form.Input
              placeholder="Search gifs..."
              autoComplete="off"
              name="search"
              type="text"
              value={this.state.newTerm}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              loading={this.state.loading}
              icon={this.state.imgData.length ? (
                <Icon
                  title="Hide"
                  name="cancel"
                  onClick={this.hideSearched}
                  link
                />
              ) : {}}
              fluid
            />
          </Form.Field>
        </Form>
        { this.state.imgData.length ? <SearchImg data={this.state.imgData[this.state.i]} turn={this.turn} /> : '' }
      </Container>
    );
  }
}

export default Search;
