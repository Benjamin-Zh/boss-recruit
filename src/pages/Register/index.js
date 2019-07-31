import React from 'react';
import { connect } from 'react-redux';
import { Flex, List, InputItem, Radio, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Icon from '../../components/Icon';
import RegisterSuccess from './components/RegisterSuccess';
import * as actions from './actions';
import { setUserInfo } from '../../actions/user';
import { USER_TYPE } from '../../constants';
import { formatError } from '../../utils';

import styles from './register.module.scss';


const { RadioItem } = Radio;
const mapStateToProps = state => ({
  registerState: state.register,
});
const mapDispatchToProps = dispatch => ({
  register: userInfo => dispatch(actions.register(userInfo)),
  setUserInfo: userInfo => dispatch(setUserInfo(userInfo)),
  resetError: () => dispatch(actions.resetError()),
});
const successRouteTransitionDuration = 800;

@connect(mapStateToProps, mapDispatchToProps)
class Register extends React.Component {
  constructor(props) {
    super(props);

    this.initialForm = {
      userName: '',
      password: '',
      confirmPassword: '',
      userType: USER_TYPE.GENIUS,
    };

    this.state = {
      form: { ...this.initialForm },
      userInfo: null,
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleCompleteProfileClick = this.handleCompleteProfileClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(key, value) {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [key]: value,
      },
    }));
  }

  handleRoleChange(userType) {
    this.setState({ userType });
  }

  async handleRegisterClick() {
    try {
      const userInfo = await this.props.register(this.state.form);

      this.setState({ userInfo });
      this.props.history.replace('/register/success');
      setTimeout(this.resetForm, successRouteTransitionDuration);
    } catch (err) { }
  }

  handleLoginClick() {
    this.props.history.push('/login');
  }

  handleCompleteProfileClick() {
    this.props.setUserInfo(this.userInfo);
  }

  handleBack() {
    this.props.history.replace('/register');
  }

  resetForm() {
    this.setState({ form: this.initialForm });
    this.props.resetError();
  }

  componentWillUnmount() {
    this.resetForm();
  }

  render() {
    const { ui } = this.props.registerState;
    const { form } = this.state;
    const { userType } = form;
    const errorMessage = formatError(ui.error);

    return (
      <div className="page-container all-center">
        <Icon
          dropShadow
          picName="register"
          background="#576574"
          className={styles.icon}
        />
        <div className={styles.panel}>
          <List>
            <InputItem
              disabled={ui.loading}
              placeholder="Your Username"
              onChange={val => this.handleChange('userName', val)}
              value={form.userName}
            >Username</InputItem>
            <InputItem
              type="password"
              disabled={ui.loading}
              placeholder="Your Password"
              onChange={val => this.handleChange('password', val)}
              value={form.password}
            >Password</InputItem>
            <InputItem
              type="password"
              disabled={ui.loading}
              placeholder="Confirm Password"
              onChange={val => this.handleChange('confirmPassword', val)}
              value={form.confirmPassword}
            >Password</InputItem>
          </List>
          <List renderHeader="Role">
            <RadioItem
              disabled={ui.loading}
              checked={userType === USER_TYPE.GENIUS}
              onChange={() => this.handleRoleChange(USER_TYPE.GENIUS)}
            >Genius</RadioItem>
            <RadioItem
              disabled={ui.loading}
              checked={userType === USER_TYPE.BOSS}
              onChange={() => this.handleRoleChange(USER_TYPE.BOSS)}
            >Boss</RadioItem>
          </List>
          <WhiteSpace />
          {
            errorMessage &&
            <Flex justify="center" align="center" className={styles['error-message']}>
              {errorMessage}
            </Flex>
          }
          <WhiteSpace size="xl" />
          <WingBlank>
            <Button
              type="primary"
              loading={ui.loading}
              disabled={ui.loading}
              onClick={this.handleRegisterClick}
            >{ ui.loading ? 'Registering, please wait...' : 'Submit' }</Button>
          </WingBlank>
          <WhiteSpace size="xl" />
          <Flex justify="center" align="center">
            Already a member？<Button
              inline
              type="ghost"
              size="small"
              onClick={this.handleLoginClick}
            >Login</Button>
          </Flex>
        </div>

        <RegisterSuccess
          userInfo={this.state.userInfo || {}}
          onBack={this.handleBack}
          onCompleteProfile={this.handleCompleteProfileClick}
          transitionDuration={successRouteTransitionDuration}
        />
      </div>
    );
  }
}

export default Register;
