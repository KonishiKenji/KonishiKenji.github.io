import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { dateInYYYYFormat, dateInMMFormat } from "@utils/date";

import dispatches from "@stores/dispatches";
import { InitialState } from "@stores/domain/offsiteWork/types";
import { ErrorsState } from "@stores/domain/errors/types";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import { AppState } from "@stores/type";

import AdminTemplate from "@components/templates/AdminTemplate";
import SelectOffsiteWorkMonth from "@components/organisms/offsite-work/SelectOffsiteWorkMonth";
import WorkplaceCompanyList from "@components/organisms/offsite-work/WorkplaceCompanyList";
import ErrorsDialog from "@components/organisms/ErrorsDialog";

import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    container: {
      margin: 16
    }
  });

interface OwnProps {
  openErrorsDialog: () => void;
}

interface StateProps {
  workplaceCompanies: InitialState["workplaceCompanies"];
  downloadables: InitialState["downloadables"];
  offsiteWorkMonthDate: string;
  errorOffsiteWork: ErrorsState["offsiteWork"];
}
interface DispatchProps {
  fetchWorkplaceCompanyList: () => Promise<void>;
  fetchDownloadable: () => Promise<void>;
  setOffsiteWorkMonth: (date: string) => void;
  fetchErrorOffsiteWork: (date: Date) => Promise<void>;
}

type MergeProps = RouteComponentProps &
  StateProps &
  DispatchProps &
  OwnProps &
  WithStyles<typeof styles>;

/**
 * 実施報告書
 */
const OffsiteWork = (props: MergeProps) => {
  const pageName = "実施報告書";

  React.useEffect(() => {
    props.fetchWorkplaceCompanyList();
    props.fetchDownloadable();
  }, []);

  const onChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    props.setOffsiteWorkMonth(value);
  };

  // エラー確認の制御
  const [isLoadedError, setLoadedError] = React.useState(false);

  const onClick = async (event: React.MouseEvent<HTMLElement>) => {
    const { offsiteWorkMonthDate } = props;
    if (offsiteWorkMonthDate === "") return;

    await props.fetchErrorOffsiteWork(new Date(offsiteWorkMonthDate));
    setLoadedError(true);
  };

  const editAction = (workplaceCompanyId: number) => () => {
    props.history.push(
      `/record/offsite-work/workplace_company/${workplaceCompanyId}`
    );
  };

  // modalの制御
  React.useEffect(() => {
    if (!isLoadedError) return;
    if (props.errorOffsiteWork.hasError === undefined) return;

    const { offsiteWorkMonthDate } = props;

    if (!props.errorOffsiteWork.hasError) {
      const year = dateInYYYYFormat(new Date(offsiteWorkMonthDate));
      const month = dateInMMFormat(new Date(offsiteWorkMonthDate));
      props.history.push(`/record/print/offsite-work/${year}/${month}`);
    } else {
      props.openErrorsDialog();
    }
    setLoadedError(false);
  }, [isLoadedError]);

  return (
    <AdminTemplate pageName={pageName}>
      <div className={props.classes.container}>
        <SelectOffsiteWorkMonth
          months={props.downloadables.months}
          value={props.offsiteWorkMonthDate}
          onChangeSelect={onChangeSelect}
          onClick={onClick}
        />
      </div>
      <div className={props.classes.container}>
        <WorkplaceCompanyList
          workplaceCompanies={props.workplaceCompanies}
          editAction={editAction}
        />
      </div>
      <ErrorsDialog errorsKey="offsiteWork" />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState) => ({
  workplaceCompanies: state.offsiteWork.workplaceCompanies,
  downloadables: state.offsiteWork.downloadables,
  offsiteWorkMonthDate: state.pages.recordOffsiteWork.offsiteWorkMonthDate,
  errorOffsiteWork: state.errors.offsiteWork
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { offsiteWorkDispatch, errorsDispatcher } = dispatches;
  const { recordOffsiteWorkDispatcher } = dispatches.pages;
  const offsiteWorkDispatcher = offsiteWorkDispatch(dispatch);
  const pageDispatcher = recordOffsiteWorkDispatcher(dispatch);
  const errorDispatcher = errorsDispatcher(dispatch);
  return {
    fetchWorkplaceCompanyList: offsiteWorkDispatcher.fetchWorkplaceCompanyList,
    fetchDownloadable: offsiteWorkDispatcher.fetchDownloadable,
    setOffsiteWorkMonth: pageDispatcher.setOffsiteWorkMonth,
    fetchErrorOffsiteWork: errorDispatcher.offsiteWork,
    openErrorsDialog: () => dispatch(errorsDialogActions.showErrorsDialog())
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(OffsiteWork)
);
