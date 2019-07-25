import React from 'react';
import { List, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Icon from '../../components/Icon';
import http from '../../utils/http';
import cn from 'classnames';

import styles from './index.module.scss';


class Index extends React.Component {
  constructor(props) {
    super(props);

    this.handleRegisterClick = this.handleRegisterClick.bind(this);
  }

  componentDidMount() {
    http.get('/data')
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

  render() {
    return (
      <div className={cn('page-container', styles.container)}>
        <Icon
          dropShadow
          picName="job"
          background="#576574"
          className={styles.icon}
        />
        <div className={styles.panel}>
          <List>
            <InputItem
              placeholder="Your Username"
            >Username</InputItem>
            <InputItem
              type="password"
              placeholder="Your Password"
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

export default Index;
