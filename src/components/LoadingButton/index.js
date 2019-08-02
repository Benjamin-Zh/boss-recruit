import React from 'react';
import { Button } from 'antd-mobile';
import omit from 'lodash/omit';


const CUSTOM_PROP_NAMES = [
  'loading',
  'normalText',
  'loadingText',
  'disabled',
  'disabledWhenLoading',
];

function LoadingButton(props) {
  const passProps = omit(props, CUSTOM_PROP_NAMES);
  const { loading, normalText, loadingText, disabled, disabledWhenLoading } = props;
  const needDisabled = disabled || (disabledWhenLoading ? loading : false);

  return (
    <Button
      {...passProps}
      loading={loading}
      disabled={needDisabled}
    >
      {loading ? loadingText : normalText}
    </Button>
  );
}

LoadingButton.defaultProps = {
  disabledWhenLoading: true,
};

export default LoadingButton;
