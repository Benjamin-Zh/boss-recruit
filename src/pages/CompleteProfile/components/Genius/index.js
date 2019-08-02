import React from 'react';
import { createForm } from 'rc-form';
import {
  List,
  InputItem,
  TextareaItem,
  WingBlank,
  WhiteSpace,
} from 'antd-mobile';
import LoadingButton from '../../../../components/LoadingButton';
import AvatarPicker from '../AvatarPicker';
import { noop, createFormFields } from '../../../../utils';


class CompleteProfileGenius extends React.Component {
  render() {
    const { getFieldDecorator }  = this.props.form;
    const { loading } = this.props;
    
    return (
      <div className="form-container">
        <List renderHeader="Avatar">
          {getFieldDecorator('avatar', {
            getValueFromEvent: value => value,
            initialValue: 0,
          })(<AvatarPicker disabled={loading} />)}
        </List>
        <List renderHeader="Basic Info">
          {getFieldDecorator('position')(
            <InputItem disabled={loading}>Position</InputItem>
          )}
        </List>
        <List renderHeader="Description">
          {getFieldDecorator('description')(
            <TextareaItem
              rows={5}
              count={100}
              disabled={loading}
            >Description</TextareaItem>
          )}
        </List>
        <WhiteSpace size="xl" />
        <WingBlank>
          <LoadingButton
            type="primary"
            onClick={this.props.onSubmit}
            loading={loading}
            normalText="Submit"
            loadingText="Submitting, please wait..."
          />
        </WingBlank>
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
      </div>
    );
  }
}

CompleteProfileGenius.defaultProps = {
  onSubmit: noop,
};

const onFieldsChange = (props, ...args) => props.onFieldsChange(...args);
const mapPropsToFields = props => createFormFields(props.fields);

export default createForm({
  onFieldsChange,
  mapPropsToFields,
})(CompleteProfileGenius);
