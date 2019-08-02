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
  render() {
    const { getFieldValue, getFieldDecorator }  = this.props.form;
    const salaryRange = getFieldValue('salaryRange') || DEFAULT_SALARY_RANGE;
    const { loading } = this.props;

    return (
      <div className="form-container">
        <List renderHeader="Avatar">
          {getFieldDecorator('avatar', {
            getValueFromEvent: value => value,
            initialValue: 0,
          })(<AvatarPicker disabled={loading} />)}
        </List>
        <List renderHeader="Job Info">
          {getFieldDecorator('position')(
            <InputItem disabled={loading}>Position</InputItem>
          )}
          {getFieldDecorator('companyName')(
            <InputItem disabled={loading}>Company</InputItem>
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

CompleteProfileBoss.defaultProps = {
  onSubmit: noop,
};

const onFieldsChange = (props, ...args) => props.onFieldsChange(...args);
const mapPropsToFields = props => createFormFields(props.fields);

export default createForm({
  onFieldsChange,
  mapPropsToFields,
})(CompleteProfileBoss);
