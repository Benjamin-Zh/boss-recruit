import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import CompleteProfileGenius from  './components/Genius';
import CompleteProfileBoss from  './components/Boss';
import needLogin from '../../decorators/NeedLoginHOC';


const mapStateToProps = state => ({
  userState: state.user,
  completeProfileState: state.completeProfile,
});

@needLogin
@connect(mapStateToProps)
class CompleteProfile extends React.Component {
  render() {
    return (
      <div className="page-container">
        <NavBar mode="dark">Complete Profile</NavBar>
        <Route path="/complete-profile/genies" component={CompleteProfileGenius} />
        <Route path="/complete-profile/boss" component={CompleteProfileBoss} />
      </div>
    );
  }
}

export default CompleteProfile;
