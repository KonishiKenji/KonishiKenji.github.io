import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import { Formik, Form, FormikActions } from "formik";
import isEqual from "lodash-es/isEqual";
import initialValues from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/initial/initialValues";
import { InitialDataValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/initial/initialData";
import validation from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/initial/validation";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import FormPaper from "@components/atoms/FormPaper";
import FirstInvoiceDataFields from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/initial/FirstInvoiceDataFields";
import PastUsageFields from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/initial/PastUsageFields";
import SocialLifeSupportFields from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/initial/SocialLifeSupportFields";
import VisitFields from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/initial/VisitFields";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { InitialState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/initial/types";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: 0
    },
    errorIcon: {
      color: "#0277bd"
    },
    discription: {
      marginTop: 6,
      marginLeft: 16
    },
    discriptionTitle: {
      marginLeft: 8,
      verticalAlign: "top"
    },
    caution: {
      color: "#f44336"
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
  initialData: InitialState;
  needsStopHistory: boolean;
}

type Props = DispatchProps & StateProps & WithStyles<typeof styles>;

interface State {
  initialDataValues: InitialDataValues;
  isFetchDone: boolean;
}

class EditInitialForm extends React.Component<Props, State> {
  public state = {
    initialDataValues: initialValues(),
    isFetchDone: false
  };

  public async componentDidMount() {
    this.setState({ isFetchDone: false });
    await this.props.fetchInitalData();
    this.setState({
      initialDataValues: initialValues(this.props.initialData)
    });
    this.setState({ isFetchDone: true });
  }

  public render() {
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
              <ContentHeaderRight>
                <FormikSubmitButton
                  buttonName="保存する"
                  formikProps={formikProps}
                  errorAction={this.submitError}
                />
              </ContentHeaderRight>
            </ContentHeader>
            <FormPaper>
              <div>
                <span>
                  <ErrorIcon className={this.props.classes.errorIcon} />
                </span>
                <span className={this.props.classes.discriptionTitle}>
                  初期データについて
                </span>
              </div>
              <p className={this.props.classes.discription}>
                月初の給付費請求作業を正しく行うには、請求額算出の前提となる以下のデータを登録する必要があります。
                <br />
                必ず
                <span className={this.props.classes.caution}>
                  初回の請求作業の実施前に登録を完了
                </span>
                させてください。
              </p>
            </FormPaper>
            {/* 初回請求月の指定 */}
            <FirstInvoiceDataFields />
            {/* 過去３カ月間の利用実績 */}
            <PastUsageFields />
            {/* 社会生活支援開始日 */}
            <SocialLifeSupportFields
              isFetchDone={this.state.isFetchDone}
              stateInitialDataValues={this.props.initialData}
              setFormikFieldValue={formikProps.setFieldValue}
            />
            {/* 訪問（生活訓練サービス費Ⅱ）開始日 */}
            {this.existsVisitDate(this.props.initialData) && (
              <VisitFields
                isFetchDone={this.state.isFetchDone}
                stateInitialDataValues={this.props.initialData}
                setFormikFieldValue={formikProps.setFieldValue}
              />
            )}
          </Form>
        )}
      </Formik>
    );
  }

  private existsVisitDate = (initialData: InitialState): boolean => {
    let existsVistit = false;
    initialData.users.map(user => {
      const uifJIRITSUKUNRENSEIKATSU = user.users_in_facility_jiritsukunren_seikatsu
        ? user.users_in_facility_jiritsukunren_seikatsu
        : {};
      if (uifJIRITSUKUNRENSEIKATSU) {
        existsVistit = Object.keys(uifJIRITSUKUNRENSEIKATSU).some(key => {
          return key === "visit_start_date";
        });
      }
    });
    return existsVistit;
  };

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
  initialData: state.JIRITSUKUNRENSEIKATSU.initial,
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch, JIRITSUKUNRENSEIKATSU } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  const initialDataDispatcher = JIRITSUKUNRENSEIKATSU.initialDataDispatcher(
    dispatch
  );

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
