import React from 'react';
import { List, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Icon from '../../components/Icon';
import http from '../../utils/http';

import styles from './login.module.scss';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleRegisterClick = this.handleRegisterClick.bind(this);
  }

  componentDidMount() {
    http.get('/user/info')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleRegisterClick() {
    this.props.history.push('/register');
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  render() {
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
              onChange={val => this.handleChange('username', val)}
            >Username</InputItem>
            <InputItem
              type="password"
              placeholder="Your Password"
              onChange={val => this.handleChange('password', val)}
            >Password</InputItem>
          </List>
          <WhiteSpace size="xl" />
          <WingBlank>
            <Button type="primary">Login</Button>
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
