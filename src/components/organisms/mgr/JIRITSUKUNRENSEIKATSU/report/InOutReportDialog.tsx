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
import { ReportType } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/types";
import { ReportInterface } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/interfaces/reportInterface";
import { toEffectiveObject } from "@utils/object";
import dispatches from "@stores/dispatches";
import validation, {
  submitValidation
} from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/report/validation";
import { InitialDataValues } from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/report/initialValues";
import InOutReportDialogSubmit from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/report/dialog/InOutReportDialogSubmit";
import InOutReportDialogFields from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/report/dialog/InOutReportDialogFields";
import { FacilityState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/facility/types";
import { AppState } from "@stores/type";
import { UsersInFacilityState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/userInFacility/types";
import { Checkbox } from "@constants/variables";

const styles = ({ spacing }: Theme) =>
  createStyles({
    action: {
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      margin: 0,
      height: 52,
      padddingBottom: 8
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
      maxWidth: 616,
      height: "calc(100% - 96px)",
      minHeight: 200
    },
    modalArea: {
      height: "99%",
      width: "100%"
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
      paddingRight: 32,
      paddingLeft: 32,
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
  putJIRITSUKUNRENSEIKATSUReport: (
    reportList: ReportInterface[],
    formValue: InitialDataValues,
    facilityState: FacilityState,
    usersInFacilityState: UsersInFacilityState,
    type: ReportType
  ) => Promise<void>;
}

interface StateProps {
  facilityState: FacilityState;
  userInFacilityState: UsersInFacilityState;
}

interface OwnProps {
  labelId?: string;
  open: boolean;
  reportList: ReportInterface[];
  data: InitialDataValues;
  selectedDate: Date;
  type: ReportType;
  onCancel: () => void;
  onSubmit: () => void;
  initialFlg: boolean;
}

interface State {
  isSubmitDisabled: boolean;
}

type Props = OwnProps & DispatchProps & StateProps & WithStyles<typeof styles>;

class InOutReportDialog extends React.Component<Props, State> {
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
                  <InOutReportDialogFields
                    formikPropsValues={formikProps}
                    isPickupAvailable={
                      this.props.facilityState.transferServiceFlag
                    }
                    isFoodAvailable={
                      this.props.facilityState.mealSaservedServiceFlag
                    }
                    isShortStayAvailable={
                      this.props.facilityState.shortStayType !== "0"
                    }
                    isSupportMentallyAvailable={
                      this.props.facilityState
                        .supportForMentallyIllDisChargeSystemType !== "0"
                    }
                    isSocialLifeAvailable={
                      this.props.userInFacilityState.user
                        .user_in_facility_jiritsukunren_seikatsu
                        ? `${this.props.userInFacilityState.user.user_in_facility_jiritsukunren_seikatsu.social_life_support_flg}` ===
                          Checkbox.ON
                        : false
                    }
                    isVisualImpairment={
                      this.props.userInFacilityState.user
                        .user_in_facility_jiritsukunren_seikatsu
                        ? `${this.props.userInFacilityState.user.user_in_facility_jiritsukunren_seikatsu.blindness_flg}` ===
                          Checkbox.ON
                        : false
                    }
                    setFormikFieldValue={formikProps.setFieldValue}
                  />
                </DialogContent>
                <DialogActions className={classes.action}>
                  <InOutReportDialogSubmit
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
      isSubmitDisabled: submitValidation(
        values.initial.status,
        validationResult
      )
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
    await this.props
      .putJIRITSUKUNRENSEIKATSUReport(
        this.props.reportList,
        values,
        this.props.facilityState,
        this.props.userInFacilityState,
        this.props.type
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
    facilityState: state.JIRITSUKUNRENSEIKATSU.facility,
    userInFacilityState: state.JIRITSUKUNRENSEIKATSU.userInFacility
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { JIRITSUKUNRENSEIKATSU } = dispatches;
  const JIRITSUKUNRENDispatcher = JIRITSUKUNRENSEIKATSU.reportDispacher(
    dispatch
  );
  return {
    putJIRITSUKUNRENSEIKATSUReport: (
      reportList: ReportInterface[],
      formValue: InitialDataValues,
      facilityState: FacilityState,
      usersInFacilityState: UsersInFacilityState,
      type: ReportType
    ) =>
      JIRITSUKUNRENDispatcher.putJIRITSUKUNRENSEIKATSUReport(
        reportList,
        formValue,
        facilityState,
        usersInFacilityState,
        type
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InOutReportDialog));
