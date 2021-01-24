import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  Theme,
  WithStyles,
  withStyles,
  createStyles,
  Paper
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import { Formik, Form, FormikActions } from "formik";
import isEqual from "lodash-es/isEqual";
import initialValues from "@initialize/mgr/IAB/initial/initialValues";
import { InitialDataValues } from "@interfaces/mgr/IAB/initial/initialData";
import validation from "@initialize/mgr/IAB/initial/validation";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import CumulativeDataFields from "@components/organisms/mgr/IAB/initial/CumulativeDataFields";
import FirstInvoiceDataFields from "@components/organisms/mgr/IAB/initial/FirstInvoiceDataFields";
import PastUsageFields from "@components/organisms/mgr/IAB/initial/PastUsageFields";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { InitialState } from "@stores/domain/mgr/IAB/initial/types";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import { UserState } from "@stores/domain/user/type";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      height: 60,
      top: 0,
      marginBottom: 8
    },
    errorIcon: {
      color: "#0277bd"
    },
    description: {
      marginTop: 0,
      marginLeft: 16,
      marginBottom: 0,
      color: "#666666",
      lineHeight: 1.75
    },
    descriptionTitle: {
      marginLeft: 8,
      verticalAlign: "top",
      fontSize: 16,
      color: "#37474f"
    },
    caution: {
      color: "#f44336"
    },
    descriptionContainer: {
      padding: "28px 32px 26px 32px",
      margin: "0 16px"
    },
    toolbar: {
      marginLeft: "auto",
      marginRight: 16,
      marginTop: 12,
      " & > button": {
        width: 120,
        height: 36
      }
    }
  });

interface DispatchProps {
  fetchInitalData: () => void;
  postInitialData: (
    values: InitialDataValues,
    initialState: InitialState
  ) => void;
  showSnackbar: (params: SnackbarParams) => void;
  stopHistory: (flag: boolean) => void;
}

interface StateProps {
  user: UserState;
  initialData: InitialState;
  needsStopHistory: boolean;
}

type Props = DispatchProps & StateProps & WithStyles<typeof styles>;

interface State {
  initialDataValues: InitialDataValues;
  isFetchDone: boolean;
  renderFlg: boolean;
}

class EditInitialForm extends React.Component<Props, State> {
  public state = {
    initialDataValues: initialValues(),
    isFetchDone: false,
    renderFlg: false
  };

  public async componentDidMount() {
    this.setState({ isFetchDone: false });
    await this.props.fetchInitalData();
    this.setState({
      initialDataValues: initialValues(this.props.initialData)
    });
    this.setState({ isFetchDone: true, renderFlg: true });
  }

  public render() {
    if (!this.state.renderFlg) {
      return null;
    }
    return (
      <Formik
        initialValues={this.state.initialDataValues}
        onSubmit={this.onSubmit}
        validate={this.validate}
        enableReinitialize={true}
      >
        {formikProps => (
          <Form>
            <ContentHeader
              position="sticky"
              classes={{ wrapper: this.props.classes.wrapper }}
            >
              <div className={this.props.classes.toolbar}>
                <FormikSubmitButton
                  buttonName="保存する"
                  formikProps={formikProps}
                  errorAction={this.submitError}
                />
              </div>
            </ContentHeader>
            <Paper
              elevation={0}
              className={this.props.classes.descriptionContainer}
            >
              <div>
                <span>
                  <ErrorIcon className={this.props.classes.errorIcon} />
                </span>
                <span className={this.props.classes.descriptionTitle}>
                  初期データについて
                </span>
              </div>
              <p className={this.props.classes.description}>
                月初の給付費請求作業を正しく行うには、請求額算出の前提となる以下のデータを登録する必要があります。
                <br />
                必ず
                <span className={this.props.classes.caution}>
                  初回の請求作業の実施前に登録を完了
                </span>
                させてください。
              </p>
            </Paper>
            {/* 初回請求月の指定 */}
            <FirstInvoiceDataFields />
            {/* 過去３カ月間の利用実績 */}
            <PastUsageFields serviceType={this.props.user.facility_type} />
            {/* 累計データ */}
            <CumulativeDataFields
              initialUsers={this.state.initialDataValues.initialData.users}
              serviceType={this.props.user.facility_type}
            />
          </Form>
        )}
      </Formik>
    );
  }

  private validate = (values: InitialDataValues) => {
    const validationResult = validation(values);
    const error = toEffectiveObject(validationResult);
    if (!this.props.needsStopHistory) {
      this.confirmDiscardFormChanges(values);
    }
    return error;
  };

  private confirmDiscardFormChanges(nextValues: InitialDataValues) {
    const hasChange = !isEqual(nextValues, this.state.initialDataValues);
    if (hasChange) {
      this.props.stopHistory(true);
    }
  }

  private submitError = () => {
    this.props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  private onSubmit = async (
    values: InitialDataValues,
    actions: FormikActions<InitialDataValues>
  ) => {
    actions.setSubmitting(true);
    await this.props.postInitialData(values, this.props.initialData);
    actions.setSubmitting(false);
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user,
  initialData: state.IAB.initial,
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch, IAB } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  const initialDataDispatcher = IAB.initialDataDispatcher(dispatch);

  return {
    fetchInitalData: initialDataDispatcher.fetch,
    postInitialData: (values: InitialDataValues, initialState: InitialState) =>
      initialDataDispatcher.post(values, initialState),
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditInitialForm));
