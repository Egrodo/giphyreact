import React, { Component, Fragment } from 'react';
import { Image, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './css/Image.css';

class ImgContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      url: '',
      title: '',
    };

  }

  componentDidMount() {
    // On first load of component.
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
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Header className="imgTitle" as="h3">
          {this.state.title}
        </Header>
        <div className="imgContainer">
          <Image
            src={this.state.url}
            centered
            loading={this.props.loading}
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