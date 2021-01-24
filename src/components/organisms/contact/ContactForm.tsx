import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { Formik, Form, FormikActions } from "formik";

import initialValues from "@initialize/contact/initialValues";
import { ContactValues } from "@interfaces/contact/contact";
import validation from "@initialize/contact/validation";
import dispatches from "@stores/dispatches";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import ContactFields from "@components/organisms/contact/ContactFields";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      padding: spacing.unit * 4
    }
  });

interface OwnProps {
  facilityName: string;
  businessOwner: string;
  history: any;
}

interface DispatchProps {
  postContact: (params: ContactValues, history: any) => void;
  showSnackbar: (params: SnackbarParams) => void;
}

type Props = DispatchProps & OwnProps & WithStyles<typeof styles>;

interface State {
  initialValues: ContactValues;
}

class ContactForm extends React.Component<Props, State> {
  public state = {
    initialValues: initialValues(
      this.props.facilityName,
      this.props.businessOwner
    )
  };

  public render() {
    return (
      <div className={this.props.classes.wrapper}>
        <Formik
          initialValues={this.state.initialValues}
          validate={this.validate}
          onSubmit={this.onSubmit}
          enableReinitialize={true}
        >
          {formikProps => (
            <Form>
              <ContactFields
                formikProps={formikProps}
                submitError={this.submitError}
              />
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  private validate = (values: ContactValues) => {
    const validationResult = validation(values);
    const error = toEffectiveObject(validationResult);
    return error;
  };

  private submitError = () => {
    this.props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  private onSubmit = async (
    values: ContactValues,
    actions: FormikActions<ContactValues>
  ) => {
    actions.setSubmitting(true);
    this.props.postContact(values, this.props.history);
    actions.setSubmitting(false);
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch, contactDispatch } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  const contactDispatches = contactDispatch(dispatch);
  return {
    postContact: (params: ContactValues, history: any) =>
      contactDispatches.post(params, history),
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params)
  };
};

export default connect<void, DispatchProps, void>(
  null,
  mapDispatchToProps
)(withStyles(styles)(ContactForm));
