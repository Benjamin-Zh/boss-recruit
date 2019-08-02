import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setLoginRedirectPath } from '../actions/system';
import renameWrapperComponent from './renameWrapperComponent';


const mapStateToProps = state => ({
  userState: state.user,
});

export default WrappedComponent => {

  @connect(mapStateToProps)
  @renameWrapperComponent('NeedLogin', WrappedComponent)
  class NeedLoginHOC extends React.Component {
    render() {
      if (this.props.userState.isLogin) {
        return <WrappedComponent {...this.props} />;
      }

      return (
        <RedirectToIndex
          redirectPath={this.props.location.pathname}
        />
      );
    }
  }

  return NeedLoginHOC;
};

const mapDidpatchToProps = dispatch => ({
  setLoginRedirectPath: url => dispatch(setLoginRedirectPath(url)),
});

@connect(null, mapDidpatchToProps)
class RedirectToIndex extends React.Component {
  componentDidMount() {
    this.props.setLoginRedirectPath(this.props.redirectPath);
  }

  render() {
    return <Redirect to="/" />
  }
}
