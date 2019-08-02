import React from 'react';
import { connect } from 'react-redux';
import renameWrapperComponent from '../../../../decorators/renameWrapperComponent';
import * as actions from '../../actions';
import { FORM_STATE_KEYS } from '../../constants';


export default userType => WrappedComponent => {
  const formStateKey = FORM_STATE_KEYS[userType];
  const mapStateToProps = state => ({
    completeProfileState: state.completeProfile,
    completeProfileFormState: state.completeProfile[formStateKey],
  });
  const mapDispatchToProps = dispatch => ({
    updateFields: (...args) => dispatch(actions.updateFields(...args)),
    submitProfile: () => dispatch(actions.submitProfile(userType)),
  });

  @connect(mapStateToProps, mapDispatchToProps)
  @renameWrapperComponent('CompleteProfileForm', WrappedComponent)
  class FormHOC extends React.Component {
    constructor(props) {
      super(props);

      this.handleFieldsChange = this.handleFieldsChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFieldsChange(changedFields) {
      this.props.updateFields(changedFields, userType);
    }

    handleSubmit() {
      this.props.submitProfile();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          fields={this.props.completeProfileFormState}
          onFieldsChange={this.handleFieldsChange}
          onSubmit={this.handleSubmit}
          loading={this.props.completeProfileState.ui.loading}
        />
      );
    }    
  }

  return FormHOC;
}
