import React from 'react';
import {
  Flex,
  List,
  InputItem,
  TextareaItem,
  Button,
  Range,
  WingBlank,
  WhiteSpace,
} from 'antd-mobile';
import { createForm } from 'rc-form';
import AvatarPicker from '../AvatarPicker';
import { noop, mapFieldsToRCFormFields } from '../../../../utils';

import styles from './complete-profile-boss.module.scss';


export const DEFAULT_SALARY_RANGE = [10, 20];

class CompleteProfileBoss extends React.Component {
  handleSubmitClick() {
    this.props.onSubmit();
  }

  render() {
    const { getFieldValue, getFieldDecorator }  = this.props.form;
    const salaryRange = getFieldValue('salaryRange') || DEFAULT_SALARY_RANGE;

    return (
      <div className={styles['form-container']}>
        <List renderHeader="Avatar">
          {getFieldDecorator('avatar', {
            getValueFromEvent: value => value,
            initialValue: 0,
          })(<AvatarPicker />)}
        </List>
        <List renderHeader="Job Info">
          {getFieldDecorator('position')(
            <InputItem>Position</InputItem>
          )}
          {getFieldDecorator('companyName')(
            <InputItem>Company</InputItem>
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
          {getFieldDecorator('count')(
            <TextareaItem
              rows={5}
              count={100}
            >Description</TextareaItem>
          )}
        </List>
        <WhiteSpace size="xl" />
        <WingBlank>
          <Button
            type="primary"
            onClick={this.handleSubmitClick}
          >Submit</Button>
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
const mapPropsToFields = props => mapFieldsToRCFormFields(props.fields);

export default createForm({
  onFieldsChange,
  mapPropsToFields,
})(CompleteProfileBoss);
