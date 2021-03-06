import React, { PureComponent } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class TrendingImg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      title: '',
      url: '',
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      src: data.images.fixed_height_downsampled.webp,
      title: data.title,
      url: data.source || data.url,
    });
  }

  render() {
    return (
      <Grid.Column>
        <Image
          src={this.state.src}
          title={this.state.title}
          href={this.state.url}
          target="_blank"
          rel="noopener"
          centered
        />
      </Grid.Column>
    );
  }
}

TrendingImg.propTypes = {
  data: PropTypes.object,
};

TrendingImg.defaultProps = {
  data: {},
};

export default TrendingImg;
