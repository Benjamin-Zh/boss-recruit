import React from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../../actions/user';
import { Flex, Icon, WhiteSpace } from 'antd-mobile';
import { getUserInfo } from '../../services/user';
import { setLoginRedirectPath } from '../../actions/system';
import { getLoggedUserRedirectPath } from '../../utils';

import styles from './index.module.scss';


const mapStateToProps = state => ({
  systemState: state.system,
});
const mapDispatchToProps = dispatch => ({
  setUserInfo: userInfo => dispatch(setUserInfo(userInfo)),
  resetLoginRedirectPath: () => dispatch(setLoginRedirectPath(null)),
});

@connect(mapStateToProps, mapDispatchToProps)
class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { data: userInfo } = await getUserInfo();
    const { isLogin } = userInfo;

    if (isLogin) {
      let redirectPath;

      if (this.props.systemState.loginRedirectPath) {
        redirectPath = this.props.systemState.loginRedirectPath;
        this.props.resetLoginRedirectPath();
      } else {
        redirectPath = getLoggedUserRedirectPath(userInfo);
      }

      this.props.setUserInfo(userInfo);
      this.props.history.replace(redirectPath);
    } else {
      this.props.history.replace('/login');
    }
  }

  render() {
    if (!this.state.loading) {
      return null;
    }

    return (
      <div className="page-container all-center">
        <Flex direction="column" justify="center" align="center">
          <Icon type="loading" />
          <WhiteSpace />
          <span className={styles['loading-text']}>Loading</span>
        </Flex>
      </div>
    );
  }
}

export default Index;
