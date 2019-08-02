import React from 'react';
import { connect } from 'react-redux';
import { Flex, List, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Icon from '../../components/Icon';
import LoadingButton from '../../components/LoadingButton';
import * as actions from './actions';
import { setUserInfo } from '../../actions/user';
import { formatError, getLoggedUserRedirectPath } from '../../utils';

import styles from './login.module.scss';


const mapStateToProps = state => ({
  loginState: state.login,
});
const mapDispatchToProps = dispatch => ({
  login: userInfo => dispatch(actions.login(userInfo)),
  setUserInfo: userInfo => dispatch(setUserInfo(userInfo)),
  resetError: () => dispatch(actions.resetError()),
});

@connect(mapStateToProps, mapDispatchToProps)
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.initialForm = {
      userName: '',
      password: '',
    };

    this.state = {
      form: {
        ...this.initialForm,
      },
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
  }

  handleRegisterClick() {
    this.props.history.push('/register');
  }

  async handleLoginClick() {
    try {
      const userInfo = await this.props.login(this.state.form);

      this.props.setUserInfo(userInfo);
      this.props.history.replace(getLoggedUserRedirectPath(userInfo));
    } catch (err) {}
  }

  handleChange(key, value) {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [key]: value,
      },
    }));
  }

  resetForm() {
    this.setState({ form: this.initialForm });
    this.props.resetError();
  }

  componentWillUnmount() {
    this.resetForm();
  }

  render() {
    const { form } = this.state;
    const { ui } = this.props.loginState;
    const errorMessage = formatError(ui.error);

    return (
      <div className="page-container all-center">
        <Icon
          dropShadow
          picName="login"
          background="#576574"
          className={styles.icon}
        />
        <div className={styles.panel}>
          <List>
            <InputItem
              placeholder="Your Username"
              onChange={val => this.handleChange('userName', val)}
              value={form.userName}
              disabled={ui.loading}
            >Username</InputItem>
            <InputItem
              type="password"
              placeholder="Your Password"
              onChange={val => this.handleChange('password', val)}
              value={form.password}
              disabled={ui.loading}
            >Password</InputItem>
          </List>
          <WhiteSpace />
          {
            errorMessage &&
            <Flex justify="center" align="center" className="error-message">
              {errorMessage}
            </Flex>
          }
          <WhiteSpace size="xl" />
          <WingBlank>
            <LoadingButton
              type="primary"
              onClick={this.handleLoginClick}
              loading={ui.loading}
              normalText="Login"
              loadingText="Logging in, please wait..."
            />
          </WingBlank>
          <WhiteSpace />
          <WingBlank>
            <Button
              onClick={this.handleRegisterClick}
            >Register</Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default Login;
