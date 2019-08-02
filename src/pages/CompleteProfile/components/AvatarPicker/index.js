import React from 'react';
import { Grid } from 'antd-mobile';
import { AVATAR_TYPES } from './constants';
import { noop } from '../../../../utils';


class AvatarPicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick({ id }) {
    this.props.onChange(id);
  }

  render() {
    const gridData = AVATAR_TYPES.map(({ id, name }) => ({
      icon: require(`./images/${name}.png`),
      text: id === this.props.value ? 'Selected' : '',
      id,
    }));

    return (
      <Grid
        data={gridData}
        onClick={this.handleItemClick}
      />
    );
  }
}

AvatarPicker.defaultProps = {
  onChange: noop,
};

export default AvatarPicker;
