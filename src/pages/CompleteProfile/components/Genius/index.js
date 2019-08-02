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
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.onSubmit(this.props.form);
  }

  render() {
    const { getFieldDecorator, getFieldError }  = this.props.form;
    const { loading, onValidateErrorClick } = this.props;

    return (
      <div className="form-container">
        <List renderHeader="Avatar">
          {getFieldDecorator('avatar', {
            getValueFromEvent: value => value,
            initialValue: 0,
            rules: [
              { type: 'number', required: true },
            ],
          })(<AvatarPicker disabled={loading} />)}
        </List>
        <List renderHeader="Basic Info">
          {getFieldDecorator('position', {
            validateTrigger: 'onBlur',
            rules: [
              { type: 'string', required: true, max: 20 },
            ],
          })(
            <InputItem
              disabled={loading}
              error={getFieldError('position')}
              onErrorClick={() => onValidateErrorClick(getFieldError('position'))}
            >Position</InputItem>
          )}
        </List>
        <List renderHeader="Description">
          {getFieldDecorator('description')(
            <TextareaItem
              rows={5}
              count={100}
              disabled={loading}
              placeholder="Your experience, your character, etc..."
            >Description</TextareaItem>
          )}
        </List>
        <WhiteSpace size="xl" />
        <WingBlank>
          <LoadingButton
            type="primary"
            onClick={this.handleSubmit}
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
  onValidateErrorClick: noop,
};

const onFieldsChange = (props, ...args) => props.onFieldsChange(...args);
const mapPropsToFields = props => createFormFields(props.fields);

export default createForm({
  onFieldsChange,
  mapPropsToFields,
})(CompleteProfileGenius);
