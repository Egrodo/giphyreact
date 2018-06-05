import React, { Component, Fragment } from 'react';
import { Image, Header, Icon, Loader, Dimmer } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './css/SearchImg.css';

class SearchImg extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      src: '',
      title: '',
      url: '',
      loading: true,
    };

    this.loaded = this.loaded.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      src: data.images.original.url,
      title: data.title,
      url: data.url,
      loading: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    // If something new is searched, update the image.
    const { data } = nextProps;
    const src = data.images.original.url;
    if (this.state.src !== src) {
      this.setState({
        src,
        title: data.title,
        url: data.url,
        loading: true,
      });
    }
  }

  loaded() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <Fragment>
        <Header
          className="imgTitle"
          as="h3"
        >
          {this.state.loading ? '' : ( 
            <a href={this.state.url} target="_blank" rel="noopener">
              { this.state.title }
            </a>
          )}
        </Header>
        <div className="SearchImg">
          <Dimmer active={this.state.loading}>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image
            src={this.state.src}
            title={this.state.title}
            onLoad={this.loaded}
            centered
          />
          <Icon onClick={this.props.turn} name="angle left" />
          <Icon onClick={this.props.turn} name="angle right" />
        </div>
      </Fragment>
    );
  }
}

SearchImg.propTypes = {
  data: PropTypes.object,
  turn: PropTypes.func,
  loading: PropTypes.bool,
};

export default SearchImg;