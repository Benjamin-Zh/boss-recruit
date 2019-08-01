import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CompleteProfileGenius from  './components/Genius';
import CompleteProfileBoss from  './components/Boss';


const mapStateToProps = state => ({
  userState: state.user,
  completeProfileState: state.completeProfile,
});

@connect(mapStateToProps)
class CompleteProfile extends React.Component {
  render() {
    return (
      <div>
        <Route path="/complete-profile/genies" component={CompleteProfileGenius} />
        <Route path="/complete-profile/boss" component={CompleteProfileBoss} />
      </div>
    );
  }
}

export default CompleteProfile;
