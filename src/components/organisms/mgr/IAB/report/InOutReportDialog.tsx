import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form, FormikActions } from "formik";
import { oneLetterWeekdaysJapanese } from "@utils/date";
import {
  IABReport,
  IABReportTypeInterface
} from "@stores/domain/mgr/IAB/report/types";
import { InitialDataValues } from "@initialize/mgr/IAB/report/initialValues";
import { toEffectiveObject } from "@utils/object";
import dispatches from "@stores/dispatches";
import validation, {
  submitValidation
} from "@initialize/mgr/IAB/report/validation";
import InOutReportDialogContent from "@components/organisms/mgr/IAB/report/dialog/InOutReportDialogContent";
import InOutReportDialogSubmit from "@components/organisms/mgr/IAB/report/dialog/InOutReportDialogSubmit";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";

const styles = (): StyleRules =>
  createStyles({
    action: {
      backgroundColor: "#ffffff",
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      margin: 0,
      paddingRight: 4,
      paddingBottom: 4
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
      width: 110
    },
    modalHeader: {
      display: "flex"
    },
    modal: {
      height: 560,
      width: 616,
      maxWidth: 616
    },
    modalContents: {
      paddingTop: 24,
      paddingRight: 16,
      paddingBottom: 0,
      paddingLeft: 16
    },
    modalHeaderArea: {
      padding: "16px 32px 18px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      fontSize: "20px",
      color: "#37474f",
      backgroundColor: "#f5f5f5"
    },
    UsageRecordDate: {
      textAlign: "right",
      flex: "auto",
      fontSize: 16
    },
    modalInner: {
      display: "flex",
      overflowY: "auto",
      flexDirection: "column",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    },
    form: {
      display: "flex",
      overflowY: "auto",
      flexDirection: "column",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    }
  });

interface DispatchProps {
  putIABReport: (
    reportList: IABReport[],
    formValue: InitialDataValues,
    type: IABReportTypeInterface["type"],
    facilityType: string
  ) => Promise<void>;
}

interface StateProps {
  user: UserState;
  facility: FacilityState;
}

interface OwnProps {
  labelId?: string;
  open: boolean;
  reportList: IABReport[];
  data: InitialDataValues;
  selectedDate: Date;
  type: IABReportTypeInterface["type"];
  onCancel: () => void;
  onSubmit: () => void;
  initialFlg: boolean;
}

interface State {
  isSubmitDisabled: boolean;
}

type Props = OwnProps & DispatchProps & StateProps & WithStyles<typeof styles>;

class InOutReportDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSubmitDisabled: true
    };
  }

  private validate = (values: InitialDataValues): void | object => {
    const validationResult = validation(values, this.props.user.featureGroup);
    this.setState({
      isSubmitDisabled: submitValidation(
        values.initial.status,
        validationResult
      )
    });
    const error = toEffectiveObject(validationResult);
    return error;
  };

  private onCancel = (): void => {
    this.setState({ isSubmitDisabled: true });
    this.props.onCancel();
  };

  private onSubmit = async (
    values: InitialDataValues,
    actions: FormikActions<InitialDataValues>
  ): Promise<void> => {
    this.onCancel();
    actions.setSubmitting(true);
    await this.props
      .putIABReport(
        this.props.reportList,
        values,
        this.props.type,
        this.props.facility.serviceType
      )
      .then(() => {
        this.props.onSubmit();
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  public render(): JSX.Element {
    const { classes, user } = this.props;
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        open={this.props.open}
        classes={{ paper: classes.modal }}
      >
        <Formik
          initialValues={this.props.data}
          validate={this.validate}
          onSubmit={this.onSubmit}
        >
          {(formikProps): JSX.Element => (
            <Form className={classes.form}>
              <div className={classes.modalInner}>
                <DialogTitle
                  id={this.props.labelId}
                  classes={{ root: classes.modalHeaderArea }}
                  disableTypography
                >
                  <div className={classes.modalHeader}>
                    {user.featureGroup.group_labor_charge === 1 ? (
                      <div>利用実績・作業時間</div>
                    ) : (
                      <div>利用実績</div>
                    )}
                    <div className={classes.UsageRecordDate}>
                      <span>
                        {this.props.selectedDate.getFullYear()}
                        <span>年</span>
                        {this.props.selectedDate.getMonth() + 1}
                        <span>月</span>
                        {this.props.selectedDate.getDate()}
                        <span>日</span>
                        <span>
                          {`(${
                            oneLetterWeekdaysJapanese[
                              this.props.selectedDate.getDay()
                            ]
                          })`}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div>{this.props.data.initial.name}</div>
                </DialogTitle>
                <DialogContent className={classes.modalContents}>
                  <InOutReportDialogContent
                    selectedDate={this.props.selectedDate}
                    formikProps={formikProps}
                    user={this.props.user}
                    facility={this.props.facility}
                  />
                </DialogContent>
                <DialogActions className={classes.action}>
                  <InOutReportDialogSubmit
                    formikPropsValues={formikProps}
                    onCancel={this.onCancel}
                    disabled={this.state.isSubmitDisabled}
                  />
                </DialogActions>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user as UserState,
  facility: state.IAB.facility
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { IAB } = dispatches;
  const IABDispatcher = IAB.reportDispatcher(dispatch);
  return {
    putIABReport: (
      reportList: IABReport[],
      formValue: InitialDataValues,
      type: IABReportTypeInterface["type"],
      facilityType: string
    ): Promise<void> =>
      IABDispatcher.putIABReport(reportList, formValue, type, facilityType)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InOutReportDialog));
