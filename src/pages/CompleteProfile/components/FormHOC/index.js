import React from 'react';
import { connect } from 'react-redux';
import renameWrapperComponent from '../../../../decorators/renameWrapperComponent';
import * as actions from '../../actions';
import { FORM_STATE_KEYS } from '../../constants';


const mapStateToProps = state => ({
  completeProfileState: state.completeProfile,
});
const mapDispatchToProps = dispatch => ({
  updateFields: (...args) => dispatch(actions.updateFields(...args)),
});

export default userType => WrappedComponent => {

  @connect(mapStateToProps, mapDispatchToProps)
  @renameWrapperComponent('CompleteProfileForm', WrappedComponent)
  class FormHOC extends React.Component {
    constructor(props) {
      super(props);

      this.handleFieldsChange = this.handleFieldsChange.bind(this);
    }

    handleFieldsChange(changedFields) {
      this.props.updateFields(changedFields, userType);
    }

    render() {
      const formStateKey = FORM_STATE_KEYS[userType];
      const fields = this.props.completeProfileState[formStateKey];

      return (
        <WrappedComponent
          {...this.props}
          fields={fields}
          onFieldsChange={this.handleFieldsChange}
        />
      );
    }    
  }

  return FormHOC;
}
