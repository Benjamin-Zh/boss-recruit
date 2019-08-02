import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import CompleteProfileGenius from  './components/Genius';
import CompleteProfileBoss from  './components/Boss';
import Form from './components/FormHOC';
import needLogin from '../../decorators/NeedLoginHOC';
import { USER_TYPE } from '../../constants';

import styles from './complete-profile.module.scss';


const mapStateToProps = state => ({
  userState: state.user,
  completeProfileState: state.completeProfile,
});

@needLogin
@connect(mapStateToProps)
class CompleteProfile extends React.Component {
  constructor(props) {
    super(props)

    this.geniusForm = Form(USER_TYPE.GENIUS)(CompleteProfileGenius);
    this.bossForm = Form(USER_TYPE.BOSS)(CompleteProfileBoss);
  }

  render() {
    const pathType = this.props.location.pathname.split('/').pop();
    const userType = typeof USER_TYPE[this.props.userState.userType] === 'string'
      ? USER_TYPE[this.props.userState.userType].toLowerCase()
      : null;

    if (!userType) {
      return <Redirect to="/" />;
    }

    if (userType !== pathType) {
      return <Redirect to={`${this.props.match.path}/${userType}`} />;
    }

    return (
      <div className="page-container">
        <NavBar
          mode="dark"
          className={styles['nav-bar']}
        >Complete Profile</NavBar>
        <Route
          path="/complete-profile/genius"
          component={this.geniusForm}
        />
        <Route
          path="/complete-profile/boss"
          component={this.bossForm}
        />
      </div>
    );
  }
}

export default CompleteProfile;
