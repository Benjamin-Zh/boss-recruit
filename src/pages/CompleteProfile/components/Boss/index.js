import React from 'react';
import { createForm } from 'rc-form';
import {
  Flex,
  List,
  InputItem,
  TextareaItem,
  Range,
  WingBlank,
  WhiteSpace,
} from 'antd-mobile';
import LoadingButton from '../../../../components/LoadingButton';
import AvatarPicker from '../AvatarPicker';
import { noop, createFormFields } from '../../../../utils';

import styles from './complete-profile-boss.module.scss';


export const DEFAULT_SALARY_RANGE = [10, 20];

class CompleteProfileBoss extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.onSubmit(this.props.form);
  }

  render() {
    const { getFieldValue, getFieldDecorator, getFieldError }  = this.props.form;
    const salaryRange = getFieldValue('salaryRange') || DEFAULT_SALARY_RANGE;
    const { loading, onValidateErrorClick } = this.props;

    return (
      <div className="form-container">
        <List renderHeader="Avatar">
          {getFieldDecorator('avatar', {
            getValueFromEvent: value => value,
            initialValue: 0,
          })(<AvatarPicker disabled={loading} />)}
        </List>
        <List renderHeader="Job Info">
          {getFieldDecorator('position', {
            validateTrigger: 'onBlur',
            rules: [
              { type: 'string', required: true },
            ],
          })(
            <InputItem
              disabled={loading}
              error={getFieldError('position')}
              onErrorClick={() => onValidateErrorClick(getFieldError('position'))}
            >Position</InputItem>
          )}
          {getFieldDecorator('companyName', {
            validateTrigger: 'onBlur',
            rules: [
              { type: 'string', required: true, min: 2 },
            ],
          })(
            <InputItem
              disabled={loading}
              error={getFieldError('companyName')}
              onErrorClick={() => onValidateErrorClick(getFieldError('companyName'))}
            >Company</InputItem>
          )}
        </List>
        <WingBlank size="lg">
          <p className="list-header-text">Salary Range</p>
          <WhiteSpace size="xs" />
          {getFieldDecorator('salaryRange', {
            getValueFromEvent: value => value,
            initialValue: DEFAULT_SALARY_RANGE,
          })(
            <Range
              pushable
              min={0}
              max={70}
              disabled={loading}
              className={styles['salary-range']}
            />
          )}
          <WhiteSpace size="xl" />
          <Flex
            justify="center"
            align="center"
            className={styles['salary-range-indicator']}
          >
            {salaryRange[0]}K - {salaryRange[1]}K
          </Flex>
        </WingBlank>
        <List renderHeader="Description">
          {getFieldDecorator('description')(
            <TextareaItem
              rows={5}
              count={100}
              disabled={loading}
              placeholder="Job's requirement, company's walfare, etc..."
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

CompleteProfileBoss.defaultProps = {
  onSubmit: noop,
};

const onFieldsChange = (props, ...args) => props.onFieldsChange(...args);
const mapPropsToFields = props => createFormFields(props.fields);

export default createForm({
  onFieldsChange,
  mapPropsToFields,
})(CompleteProfileBoss);
