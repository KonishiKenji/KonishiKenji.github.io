import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form, FormikActions } from "formik";
import { oneLetterWeekdaysJapanese } from "@utils/date";
import {
  SEIKATSUKAIGOReport,
  SEIKATSUKAIGOReportTypeInterface
} from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import { InitialDataValues } from "@initialize/mgr/SEIKATSUKAIGO/report/initialValues";
import { toEffectiveObject } from "@utils/object";
import dispatches from "@stores/dispatches";
import validation, {
  submitValidation
} from "@initialize/mgr/SEIKATSUKAIGO/report/validation";
import InOutReportDialogSubmit from "@components/organisms/mgr/SEIKATSUKAIGO/report/dialog/InOutReportDialogSubmit";
import InOutReportDialogFields from "@components/organisms/mgr/SEIKATSUKAIGO/report/dialog/InOutReportDialogFields";
import { FacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";
import { AppState } from "@stores/type";
import { InitialValues } from "@interfaces/mgr/SEIKATSUKAIGO/report/initial";

const styles = ({ spacing }: Theme): StyleRules =>
  createStyles({
    action: {
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      marginBottom: 0,
      marginTop: 0,
      height: "10%"
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
      maxWidth: 616
    },
    modalArea: {
      height: 560,
      width: 616
    },
    modalContents: {
      paddingTop: 24,
      paddingRight: 16,
      paddingBottom: 0,
      paddingLeft: 16,
      height: 458
    },
    modalHeaderArea: {
      height: "8%",
      padding: "12px 32px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      fontSize: "20px"
    }
  });

interface DispatchProps {
  putSEIKATSUKAIGOReport: (
    reportList: SEIKATSUKAIGOReport[],
    formValue: InitialValues,
    type: SEIKATSUKAIGOReportTypeInterface["type"],
    facilityState: FacilityState
  ) => Promise<void>;
}

interface StateProps {
  facilityState: FacilityState;
}

interface OwnProps {
  labelId?: string;
  open: boolean;
  reportList: SEIKATSUKAIGOReport[];
  data: InitialDataValues;
  selectedDate: Date;
  type: SEIKATSUKAIGOReportTypeInterface["type"];
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
      .putSEIKATSUKAIGOReport(
        this.props.reportList,
        values,
        this.props.type,
        this.props.facilityState
      )
      .then(() => {
        this.props.onSubmit();
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        open={this.props.open}
        classes={{ paper: classes.modal }}
      >
        <div className={this.props.classes.modalArea}>
          <DialogTitle
            id={this.props.labelId}
            classes={{ root: classes.modalHeaderArea }}
            disableTypography
          >
            <div className={this.props.classes.modalHeader}>
              利用実績
              <span>{this.props.data.initial.name}</span>
              <span>
                {this.props.selectedDate.getFullYear()}
                <span>年</span>
                {this.props.selectedDate.getMonth() + 1}
                <span>月</span>
                {this.props.selectedDate.getDate()}
                <span>日</span>
                <span>
                  （
                  {oneLetterWeekdaysJapanese[this.props.selectedDate.getDay()]}
                  ）
                </span>
              </span>
            </div>
          </DialogTitle>
          <Formik
            initialValues={this.props.data}
            validate={this.validate}
            onSubmit={this.onSubmit}
          >
            {(formikProps) => (
              <Form>
                <DialogContent className={classes.modalContents}>
                  <InOutReportDialogFields
                    formikPropsValues={formikProps}
                    isPickupAvailable={
                      this.props.facilityState.transferServiceFlag
                    }
                    isFoodAvailable={
                      this.props.facilityState.mealSaservedServiceFlag
                    }
                    setFormikFieldValue={formikProps.setFieldValue}
                    isSevereFailureSupport={
                      this.props.facilityState.severeFailureSupportFlag
                    }
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
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    facilityState: state.SEIKATSUKAIGO.facility
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { SEIKATSUKAIGO } = dispatches;
  const seikatsukaigoDispatcher = SEIKATSUKAIGO.reportDispacher(dispatch);
  return {
    putSEIKATSUKAIGOReport: (
      reportList: SEIKATSUKAIGOReport[],
      formValue: InitialValues,
      type: SEIKATSUKAIGOReportTypeInterface["type"],
      facilityState: FacilityState
    ): Promise<void> =>
      seikatsukaigoDispatcher.putSEIKATSUKAIGOReport(
        reportList,
        formValue,
        facilityState,
        type
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InOutReportDialog));
