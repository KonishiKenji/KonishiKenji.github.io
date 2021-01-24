import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import dispatches from "@stores/dispatches";
import ContactTemplate from "@components/templates/ContactTemplate";
import ContactForm from "@components/organisms/contact/ContactForm";
import ContactFormHeader from "@components/organisms/contact/ContactFormHeader";

interface DispatchProps {
  fetchUser: () => void;
}

interface StateProps {
  facility_name: string;
  business_owner: string;
}

interface Props extends DispatchProps, StateProps, RouteComponentProps {}

/**
 * お問い合わせ
 */
class Contact extends React.Component<Props> {
  public render() {
    return (
      <ContactTemplate>
        <ContactFormHeader />
        <ContactForm
          facilityName={this.props.facility_name}
          businessOwner={this.props.business_owner}
          history={this.props.history}
        />
      </ContactTemplate>
    );
  }
}

const mapStateToProps = (state: any): StateProps => {
  return {
    facility_name: state.user.facility_name,
    business_owner: state.user.business_owner
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { userDispatch } = dispatches;

  return {
    fetchUser: userDispatch(dispatch).me
  };
};

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
