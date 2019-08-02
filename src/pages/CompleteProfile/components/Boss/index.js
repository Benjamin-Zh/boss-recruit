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
import styles from './complete-profile-boss.module.scss';


const DEFAULT_SALARY_RANGE = [10, 20];

class CompleteProfileBoss extends React.Component {
  handleSubmitClick() {
    console.log('submit');
  }

  render() {
    const { getFieldProps, getFieldValue }  = this.props.form;
    const salaryRange = getFieldValue('salaryRange') || DEFAULT_SALARY_RANGE;

    return (
      <div className={styles['form-container']}>
        <List renderHeader="Avatar">
          <AvatarPicker
            {...getFieldProps('avatar', {
              getValueFromEvent: value => value,
              initialValue: 0,
            })}
          />
        </List>
        <List renderHeader="Job Info">
          <InputItem {...getFieldProps('position')}>Position</InputItem>
          <InputItem {...getFieldProps('companyName')}>Company</InputItem>
        </List>
        <WingBlank size="lg">
          <p className="list-header-text">Salary Range</p>
          <WhiteSpace size="xs" />
          <Range
            {...getFieldProps('salaryRange', {
              getValueProps: value => value,
              getValueFromEvent: value => value,
              initialValue: DEFAULT_SALARY_RANGE,
            })}
            pushable
            min={0}
            max={70}
            defaultValue={DEFAULT_SALARY_RANGE}
            className={styles['salary-range']}
          />
          <WhiteSpace size="xl" />
          <Flex justify="center" align="center" className={styles['salary-range-indicator']}>
            {salaryRange[0]}K - {salaryRange[1]}K
          </Flex>
        </WingBlank>
        <List renderHeader="Description">
          <TextareaItem
            {...getFieldProps('count')}
            rows={5}
            count={100}
          >Description</TextareaItem>
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

export default createForm()(CompleteProfileBoss);
