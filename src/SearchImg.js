import React, { Component, Fragment } from 'react';
import { Image, Header, Icon, Loader, Dimmer } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './css/SearchImg.css';

class ImgContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      url: '',
      title: '',
      loading: true,
    };

    this.loaded = this.loaded.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      url: data.images.original.url,
      title: data.title,
    });
  }

  componentWillReceiveProps(nextProps) {
    // If something new is searched, update the image.
    const { data } = nextProps;
    const url = data.images.original.url;
    const title = data.title;
    if (this.state.url !== url) {
      this.setState({
        url,
        title,
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
        <Header className="imgTitle" as="h3">
          {this.state.loading ? '' : this.state.title}
        </Header>
        <div className="imgContainer">
          <Dimmer active={this.state.loading}>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image
            src={this.state.url}
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

ImgContainer.propTypes = {
  data: PropTypes.object,
  turn: PropTypes.func,
  loading: PropTypes.bool,
};

export default ImgContainer;