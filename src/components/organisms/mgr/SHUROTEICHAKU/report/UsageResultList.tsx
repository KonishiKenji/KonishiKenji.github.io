import * as React from "react";
import * as ClassNames from "classnames";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import { AppState } from "@stores/type";
import { UsageResultsState } from "@stores/domain/mgr/SHUROTEICHAKU/report/types";
import { ErrorsState } from "@stores/domain/errors/types";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import { OptionInterface } from "@components/atoms/DropDown";
import UsageResultListHeader from "@components/organisms/mgr/SHUROTEICHAKU/report/UsageResultListHeader";
import UsageResultListTable from "@components/organisms/mgr/SHUROTEICHAKU/report/UsageResultListTable";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";
import UsageResultListHeaderEdit from "./UsageResultListHeaderEdit";
import { Formik, Form, FormikActions } from "formik";
import { InitialDataValues } from "@interfaces/mgr/SHUROTEICHAKU/report/initialData";
import initialValues from "@initialize/mgr/SHUROTEICHAKU/report/initialValues";
import reportValidation from "@initialize/mgr/SHUROTEICHAKU/report/validation";
import { toEffectiveObject } from "@utils/object";
import { dateInYYYYMMFormat } from "@utils/date";
import isEqual from "lodash-es/isEqual";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    clear: {
      clear: "both"
    },
    headerWrapper: {
      position: "sticky",
      top: 0,
      backgroundColor: palette.background.default,
      zIndex: 10
    },
    headerInfoContainer: {
      width: "100%",
      paddingRight: 16,
      paddingLeft: 16,
      marginTop: 16,
      marginBottom: 16
    },
    table: {
      tableLayout: "fixed"
    },
    tableContainer: {
      padding: `${spacing.unit * 2}px ${spacing.unit * 4}px ${spacing.unit *
        4}px`,
      margin: `0px ${spacing.unit * 2}px ${spacing.unit * 2}px ${spacing.unit *
        2}px`
    },
    button: {
      marginLeft: 10,
      border: "1px solid #cccccc",
      boxShadow: "none",
      borderRadius: 4
    },
    allStatusType: {
      marginBottom: spacing.unit * 2
    }
  });

interface StateProps {
  usageResultList: UsageResultsState;
  inoutErrors: ErrorsState["inout"];
  needsStopHistory: boolean;
}

interface DispatchProps {
  fetch: (uifId: string, date: Date) => void;
  fetchInoutError: (date: Date) => void;
  openErrorsDialog: () => void;
  post: (
    formValue: InitialDataValues,
    reportValue: UsageResultsState["usageResults"],
    id: string,
    date: string
  ) => Promise<void>;
  stopHistory: (flag: boolean) => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  isEditing: boolean;
  selectedMonth: Date;
  selectedUser: OptionInterface;
  headerHeight: number;
}

const currentDateForMonthly = new Date();
// 日付の最大値の設定 (30年後の12月31日)
const maxDate = new Date(currentDateForMonthly.getFullYear() + 30, 11, 31);
const minDate = new Date(2001, 0, 1);

/**
 * 利用実績（月ごと）
 */
class UsageResultList extends React.Component<Props, State> {
  public readonly state: State = {
    isEditing: false,
    selectedMonth: currentDateForMonthly,
    selectedUser: { label: "", value: "" },
    headerHeight: 0
  };

  public componentDidUpdate() {
    const top = document.getElementById("reportMonthlyHeader");
    if (top && top.clientHeight !== this.state.headerHeight) {
      this.setState({
        headerHeight: top.clientHeight
      });
    }
  }

  public render() {
    const { classes, usageResultList, inoutErrors } = this.props;
    const { isEditing, selectedMonth, selectedUser, headerHeight } = this.state;

    return (
      <React.Fragment>
        <Formik
          initialValues={initialValues(this.props.usageResultList)}
          onSubmit={this.onSubmit}
          validate={this.validate}
          enableReinitialize={true}
        >
          {formikProps => (
            <Form>
              <div id="reportMonthlyHeader" className={classes.headerWrapper}>
                {inoutErrors.hasError && (
                  <InvoiceErrorBar
                    message={`${inoutErrors.errorCount} 件のエラーが起きています。内容を確認し、データを修正してください。`}
                    onClick={this.onClickErrorDialog}
                  />
                )}

                <div className={classes.headerInfoContainer}>
                  {isEditing ? (
                    <UsageResultListHeaderEdit
                      selectedMonth={selectedMonth}
                      selectedUserName={selectedUser.label}
                      onChangeEditMode={this.onChangeEditMode}
                      formikProps={formikProps}
                      resetForm={formikProps.resetForm}
                    />
                  ) : (
                    <UsageResultListHeader
                      minDate={minDate}
                      maxDate={maxDate}
                      selectedMonth={selectedMonth}
                      isSubmitDisabled={!usageResultList.usageResults.length}
                      selectedUserId={selectedUser.value}
                      onChangeMonth={this.onChangeMonth}
                      onChangeUser={this.onChangeUser}
                      onChangeEditMode={this.onChangeEditMode}
                      resetForm={formikProps.resetForm}
                      usageResultList={initialValues(
                        this.props.usageResultList
                      )}
                    />
                  )}
                </div>
              </div>

              <Paper
                elevation={0}
                className={ClassNames(classes.clear, classes.tableContainer)}
              >
                <UsageResultListTable
                  isEditing={isEditing}
                  headerHeight={headerHeight}
                />
              </Paper>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }

  private onChangeMonth = (date: Date, user: OptionInterface) => {
    this.setState({ selectedMonth: date });
    this.setState({ selectedUser: user });
    this.props.fetch(`${user.value}`, date);
    this.props.fetchInoutError(date);
  };

  private onChangeUser = (user: OptionInterface) => {
    this.setState({ selectedUser: user });
    this.props.fetch(`${user.value}`, this.state.selectedMonth);
    this.props.fetchInoutError(this.state.selectedMonth);
  };

  private onClickErrorDialog = () => {
    this.props.openErrorsDialog();
  };

  private onSubmit = async (
    values: InitialDataValues,
    actions: FormikActions<InitialDataValues>
  ) => {
    actions.setSubmitting(true);
    this.props
      .post(
        values,
        this.props.usageResultList.usageResults,
        `${this.state.selectedUser.value}`,
        dateInYYYYMMFormat(this.state.selectedMonth)
      )
      .finally(() => {
        this.onChangeEditMode();
        actions.resetForm(initialValues(this.props.usageResultList));
        actions.setSubmitting(false);
      });
  };
  /**
   * 編集状態変更
   * 離脱ダイアログ表示の停止を行う
   */
  private onChangeEditMode = () => {
    if (this.state.isEditing) {
      this.props.stopHistory(false);
    }
    this.setState({ isEditing: !this.state.isEditing });
  };

  // 差分チェック差分があれば離脱モーダルフラグをONに変更する。
  private confirmDiscardFormChanges(nextValues: InitialDataValues) {
    const hasChange = !isEqual(
      nextValues,
      initialValues(this.props.usageResultList)
    );
    if (hasChange) {
      this.props.stopHistory(true);
    }
  }

  // バリデーション動作時に離脱モーダルのフラグを立てる。
  private validate = (values: InitialDataValues) => {
    const validationResult = reportValidation(values);
    if (!this.props.needsStopHistory) {
      this.confirmDiscardFormChanges(values);
    }
    const error = toEffectiveObject(validationResult);
    return error;
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  usageResultList: state.SHUROTEICHAKU.report,
  inoutErrors: state.errors.inout,
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { SHUROTEICHAKU, errorsDispatcher, uiDispatch } = dispatches;
  const reportDispatches = SHUROTEICHAKU.reportDispacher(dispatch);
  const uiDispatches = uiDispatch(dispatch);

  return {
    fetch: (uifId: string, date: Date) => reportDispatches.fetch(uifId, date),
    fetchInoutError: errorsDispatcher(dispatch).inout,
    openErrorsDialog: () => dispatch(errorsDialogActions.showErrorsDialog()),
    post: (
      formValue: InitialDataValues,
      reportValue: UsageResultsState["usageResults"],
      id: string,
      date: string
    ) => reportDispatches.post(formValue, reportValue, id, date),
    stopHistory: uiDispatches.stopHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsageResultList));
