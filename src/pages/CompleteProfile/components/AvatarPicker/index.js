import React from 'react';
import { Grid } from 'antd-mobile';
import { AVATAR_TYPES } from './constants';
import { noop } from '../../../../utils';


const disabledStyle = {
  backgroundColor: '#f5f5f5',
  filter: 'grayscale(.8)',
};

class AvatarPicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick({ id }) {
    if (this.props.disabled) return;
    this.props.onChange(id);
  }

  render() {
    const { disabled } = this.props;
    const gridData = AVATAR_TYPES.map(({ id, name }) => ({
      icon: require(`./images/${name}.png`),
      text: id === this.props.value ? 'Selected' : '',
      id,
    }));

    return (
      <Grid
        data={gridData}
        onClick={this.handleItemClick}
        activeStyle={!disabled}
        itemStyle={disabled ? disabledStyle : null}
      />
    );
  }
}

AvatarPicker.defaultProps = {
  onChange: noop,
};

export default AvatarPicker;
