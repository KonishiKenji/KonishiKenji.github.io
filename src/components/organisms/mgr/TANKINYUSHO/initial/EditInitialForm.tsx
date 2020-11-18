import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import { Formik, Form, FormikActions } from "formik";
import isEqual from "lodash-es/isEqual";
import initialValues from "@initialize/mgr/TANKINYUSHO/initial/initialValues";
import { InitialDataValues } from "@interfaces/mgr/TANKINYUSHO/initial/initialData";
import validation from "@initialize/mgr/TANKINYUSHO/initial/validation";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import FormPaper from "@components/atoms/FormPaper";
import FirstInvoiceDataFields from "@components/organisms/mgr/TANKINYUSHO/initial/FirstInvoiceDataFields";
import PastUsageFields from "@components/organisms/mgr/TANKINYUSHO/initial/PastUsageFields";
import ShortTermUsageAdditionFields from "@components/organisms/mgr/TANKINYUSHO/initial/ShortTermUsageAdditionFields";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { InitialState } from "@stores/domain/mgr/TANKINYUSHO/initial/types";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import deepEqual from "fast-deep-equal";

const styles = ({ spacing }: Theme): StyleRules =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: 0
    },
    errorIcon: {
      color: "#0277bd"
    },
    description: {
      marginTop: 6,
      marginLeft: 16
    },
    descriptionTitle: {
      marginLeft: 8,
      verticalAlign: "top"
    },
    caution: {
      color: "#f44336"
    }
  });

interface DispatchProps {
  fetchInitialData: () => void;
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
}

class EditInitialForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      initialDataValues: initialValues()
    };
  }

  public render(): JSX.Element {
    return (
      <Formik
        initialValues={this.state.initialDataValues}
        onSubmit={this.onSubmit}
        validate={this.validate}
        enableReinitialize={true}
      >
        {(formikProps): JSX.Element => (
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
            </FormPaper>
            {/* 初回請求月の指定 */}
            <FirstInvoiceDataFields />
            {/* 過去３カ月間の利用実績 */}
            <PastUsageFields />
            {/* 短期利用加算 */}
            <ShortTermUsageAdditionFields
              initialData={this.props.initialData}
              formikProps={formikProps}
              setFormikFieldValue={formikProps.setFieldValue}
            />
          </Form>
        )}
      </Formik>
    );
  }

  public async componentDidMount(): Promise<void> {
    await this.props.fetchInitialData();
    this.setState({
      initialDataValues: initialValues(this.props.initialData)
    });
  }

  public componentDidUpdate(prevProps: Props) {
    // 再取得時、formを更新
    if (!deepEqual(this.props.initialData, prevProps.initialData)) {
      this.setState({
        initialDataValues: initialValues(this.props.initialData)
      });
    }
  }

  private validate = (values: InitialDataValues): void | object => {
    const validationResult = validation(values);
    const error = toEffectiveObject(validationResult);
    if (!this.props.needsStopHistory) {
      this.confirmDiscardFormChanges(values);
    }
    return error;
  };

  private submitError = (): void => {
    this.props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  private onSubmit = async (
    values: InitialDataValues,
    actions: FormikActions<InitialDataValues>
  ): Promise<void> => {
    actions.setSubmitting(true);
    await this.props.postInitialData(values, this.props.initialData);
    actions.setSubmitting(false);
  };

  private confirmDiscardFormChanges(nextValues: InitialDataValues): void {
    const hasChange = !isEqual(nextValues, this.state.initialDataValues);
    if (hasChange) {
      this.props.stopHistory(true);
    }
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  initialData: state.TANKINYUSHO.initial,
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch, TANKINYUSHO } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  const initialDataDispatcher = TANKINYUSHO.initialDataDispatcher(dispatch);

  return {
    fetchInitialData: initialDataDispatcher.fetch,
    postInitialData: (
      values: InitialDataValues,
      initialState: InitialState
    ): Promise<void> => initialDataDispatcher.post(values, initialState),
    showSnackbar: (params: SnackbarParams): void =>
      uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditInitialForm));
