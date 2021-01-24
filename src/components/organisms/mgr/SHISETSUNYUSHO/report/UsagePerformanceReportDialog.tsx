import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form, FormikActions } from "formik";
import { oneLetterWeekdaysJapanese } from "@utils/date";
import { InitialDataValues } from "@initialize/mgr/SHISETSUNYUSHO/report/initialValues";
import { toEffectiveObject } from "@utils/object";
import dispatches from "@stores/dispatches";
import validation, {
  submitValidation
} from "@initialize/mgr/SHISETSUNYUSHO/report/validation";
import UsagePerformanceReportDialogSubmit from "@components/organisms/mgr/SHISETSUNYUSHO/report/dialog/UsagePerformanceReportDialogSubmit";
import UsagePerformanceReportDialogFields from "@components/organisms/mgr/SHISETSUNYUSHO/report/dialog/UsagePerformanceReportDialogFields";
import { FacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/facility/types";
import { AppState } from "@stores/type";
import { InitialValues } from "@interfaces/mgr/SHISETSUNYUSHO/report/initial";
import {
  UsagePerformanceType,
  UsagePerformanceSHISETSUNYUSHOType,
  ReportType,
  REPEAT_DAILY
} from "@stores/domain/mgr/SHISETSUNYUSHO/report/types";
import { UsersInFacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/userInFacility/types";
import { INT_TRUE_FROM_API } from "@constants/variables";

const styles = ({ spacing }: Theme) =>
  createStyles({
    action: {
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      margin: 0,
      height: 52
    },
    modalAction: {
      display: "flex"
    },
    button: {
      border: "1px solid #cccccc",
      boxShadow: "none",
      borderRadius: 4,
      textTransform: "none",
      width: 110
    },
    submit: {
      marginLeft: spacing.unit,
      width: 110,
      marginRight: spacing.unit
    },
    modalHeader: {
      display: "flex"
    },
    modal: {
      width: "80%",
      maxWidth: 600,
      maxHeight: 872,
      minHeight: 200,
      height: "calc(100% - 67px)"
    },
    modalArea: {
      height: "100%",
      width: 600
    },
    modalContents: {
      paddingRight: 32,
      paddingLeft: 32,
      height: "calc(100% - 52px)",
      // first-childが上書きしてくるため再上書き
      "&:first-child": {
        paddingTop: 30,
        paddingBottom: 0
      }
    },
    modalHeaderArea: {
      height: 52,
      paddingTop: 14,
      paddingBottom: 14,
      paddingLeft: 32,
      paddingRight: 32,
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      fontSize: 20
    },
    headerName: {
      marginRight: 8,
      marginLeft: 32
    },
    weekArea: {
      marginLeft: 16
    },
    formArea: {
      height: "calc(100% - 52px)"
    }
  });

interface DispatchProps {
  postSHISETSUNYUSHOReportDaily: (
    report: UsagePerformanceType,
    reportSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType,
    formValue: InitialValues,
    usersInFacilityState: UsersInFacilityState,
    facilityState: FacilityState
  ) => Promise<void>;
  postSHISETSUNYUSHOReportUsers: (
    report: UsagePerformanceType,
    reportSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType,
    formValue: InitialValues,
    usersInFacilityState: UsersInFacilityState,
    facilityState: FacilityState
  ) => Promise<void>;
}

interface StateProps {
  facilityState: FacilityState;
  userInFacilityState: UsersInFacilityState;
}

interface OwnProps {
  labelId?: string;
  open: boolean;
  report: UsagePerformanceType;
  reportSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType;
  data: InitialDataValues;
  selectedDate: Date;
  type: ReportType;
  onCancel: () => void;
  onSubmit: () => void;
}

interface State {
  isSubmitDisabled: boolean;
}

type Props = OwnProps & DispatchProps & StateProps & WithStyles<typeof styles>;

class UsagePerformanceReportDialog extends React.Component<Props, State> {
  public readonly state: State = {
    isSubmitDisabled: true
  };

  public render() {
    const { classes } = this.props;
    return (
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={this.props.open}
        classes={{ paper: classes.modal }}
      >
        <div className={this.props.classes.modalArea}>
          <DialogTitle
            id={this.props.labelId}
            classes={{ root: classes.modalHeaderArea }}
            disableTypography={true}
          >
            <div className={this.props.classes.modalHeader}>
              利用実績
              <span className={this.props.classes.headerName}>
                {this.props.data.initial.name}
              </span>
              <span>
                {this.props.selectedDate.getFullYear()}
                <span>年</span>
                {this.props.selectedDate.getMonth() + 1}
                <span>月</span>
                {this.props.selectedDate.getDate()}
                <span>日</span>
                <span className={this.props.classes.weekArea}>
                  {`(${
                    oneLetterWeekdaysJapanese[this.props.selectedDate.getDay()]
                  })`}
                </span>
              </span>
            </div>
          </DialogTitle>
          <Formik
            initialValues={this.props.data}
            validate={this.validate}
            onSubmit={this.onSubmit}
          >
            {formikProps => (
              <Form className={classes.formArea}>
                <DialogContent className={classes.modalContents}>
                  <UsagePerformanceReportDialogFields
                    formikPropsValues={formikProps}
                    isSevereDisabilitySupport={
                      this.props.userInFacilityState.user
                        .user_in_facility_shisetsunyusho
                        ? this.props.userInFacilityState.user
                            .user_in_facility_shisetsunyusho
                            .severe_disability_support === INT_TRUE_FROM_API
                        : false
                    }
                    facilityState={this.props.facilityState}
                    setFormikFieldValue={formikProps.setFieldValue}
                  />
                </DialogContent>
                <DialogActions className={classes.action}>
                  <UsagePerformanceReportDialogSubmit
                    formikPropsValues={formikProps}
                    onCancel={this.onCancel}
                    disabled={this.state.isSubmitDisabled}
                  />
                </DialogActions>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog>
    );
  }

  private validate = (values: InitialDataValues) => {
    const validationResult = validation(values);
    this.setState({
      isSubmitDisabled: submitValidation(validationResult)
    });
    const error = toEffectiveObject(validationResult);
    return error;
  };

  private onCancel = () => {
    this.setState({ isSubmitDisabled: true });
    this.props.onCancel();
  };

  private onSubmit = async (
    values: InitialDataValues,
    actions: FormikActions<InitialDataValues>
  ) => {
    this.onCancel();
    actions.setSubmitting(true);
    await (this.props.type === REPEAT_DAILY
      ? this.props.postSHISETSUNYUSHOReportDaily(
          this.props.report,
          this.props.reportSHISETSUNYUSHO,
          values,
          this.props.userInFacilityState,
          this.props.facilityState
        )
      : this.props.postSHISETSUNYUSHOReportUsers(
          this.props.report,
          this.props.reportSHISETSUNYUSHO,
          values,
          this.props.userInFacilityState,
          this.props.facilityState
        )
    )
      .then(() => {
        this.props.onSubmit();
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    facilityState: state.SHISETSUNYUSHO.facility,
    userInFacilityState: state.SHISETSUNYUSHO.userInFacility
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { SHISETSUNYUSHO } = dispatches;
  const SHISETSUNYUSHODispatcher = SHISETSUNYUSHO.reportDispatcher(dispatch);
  return {
    postSHISETSUNYUSHOReportDaily: (
      report: UsagePerformanceType,
      reportSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType,
      formValue: InitialValues,
      usersInFacilityState: UsersInFacilityState,
      facilityState: FacilityState
    ) =>
      SHISETSUNYUSHODispatcher.postSHISETSUNYUSHOReportDaily(
        report,
        reportSHISETSUNYUSHO,
        formValue,
        usersInFacilityState,
        facilityState
      ),
    postSHISETSUNYUSHOReportUsers: (
      report: UsagePerformanceType,
      reportSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType,
      formValue: InitialValues,
      usersInFacilityState: UsersInFacilityState,
      facilityState: FacilityState
    ) =>
      SHISETSUNYUSHODispatcher.postSHISETSUNYUSHOReportUsers(
        report,
        reportSHISETSUNYUSHO,
        formValue,
        usersInFacilityState,
        facilityState
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsagePerformanceReportDialog));
