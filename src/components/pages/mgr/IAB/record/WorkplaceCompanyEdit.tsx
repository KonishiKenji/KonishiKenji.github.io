import * as React from "react";
import * as H from "history";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme
} from "@material-ui/core/styles";

import { PostWorkplaceCompanyBody } from "@api/requests/offsiteWork/postWorkplaceCompany";
import { GetWorkplaceCompanyResponse } from "@api/requests/offsiteWork/getWorkplaceCompany";

import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { CityState, CityParams } from "@stores/domain/city/type";

import AdminTemplate from "@components/templates/AdminTemplate";
import WorkplaceCompanyForm from "@components/organisms/mgr/IAB/record/WorkplaceCompanyForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import ConfirmDialog from "@components/atoms/ConfirmDialog";

const styles = ({ spacing }: Theme) =>
  createStyles({
    container: {
      margin: spacing.unit * 2
    }
  });

type OwnProps = WithStyles<typeof styles> &
  RouteComponentProps<{
    id: string;
  }>;
interface StateProps {
  cityList: CityState[];
  workplaceCompany: GetWorkplaceCompanyResponse["data"];
}
interface DispatchProps {
  fetchWorkplaceCompany: (id: string) => Promise<void>;
  postWorkplaceCompany: (
    data: PostWorkplaceCompanyBody,
    history: H.History
  ) => Promise<void>;
  deleteWorkplaceCompany: (id: string, history: H.History) => Promise<void>;
  clearWorkplaceCompany: () => Promise<void>;
  stopHistory: (flag: boolean) => void;
  fetchCity: (params: CityParams) => Promise<void>;
}

type MergeProps = StateProps & DispatchProps & OwnProps;

/**
 * 就労先企業情報 新規作成/修正
 */
const WorkplaceCompanyEdit = (props: MergeProps) => {
  const { id } = props.match.params;

  const pageName = id ? "編集" : "新規作成";
  const editMode = !!id;

  React.useEffect(() => {
    props.clearWorkplaceCompany();

    if (id) {
      props.fetchWorkplaceCompany(id);
    } else {
      props.fetchWorkplaceCompany("");
    }
  }, []);

  React.useEffect(() => {
    const { prefecture_name } = props.workplaceCompany.workplace_company;
    if (prefecture_name !== undefined && prefecture_name !== "") {
      props.fetchCity({
        prefectureName: prefecture_name
      });
    }
  }, [props.workplaceCompany.workplace_company.prefecture_name]);

  const cancelAction = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    await props.stopHistory(false);
    props.history.push("/record/offsite-work");
  };

  const deleteAction = async () => {
    if (id) {
      await props.deleteWorkplaceCompany(`${id}`, props.history);
    }
  };

  const submitlCreateAction = async (results: PostWorkplaceCompanyBody) => {
    await props.postWorkplaceCompany(results, props.history);
  };

  // 編集確認
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [updateData, setUpdateData] = React.useState<
    PostWorkplaceCompanyBody
  >();

  const submitlEditConfirmAction = (results: PostWorkplaceCompanyBody) => {
    setOpenUpdateModal(true);
    setUpdateData(results);
  };
  const submitlEditAction = async () => {
    if (updateData) {
      await props.postWorkplaceCompany(updateData, props.history);
    }
  };
  const onCloseDialog = () => {
    setOpenUpdateModal(false);
  };

  return (
    <AdminTemplate
      pageName={pageName}
      pathList={[{ pathName: "就労先企業情報", path: "/record/offsite-work" }]}
    >
      <div className={props.classes.container}>
        <WorkplaceCompanyForm
          submitAction={
            editMode ? submitlEditConfirmAction : submitlCreateAction
          }
          cancelAction={cancelAction}
          deleteAction={deleteAction}
          workplaceCompany={props.workplaceCompany}
          editMode={editMode}
        />
      </div>
      <NavigationTransitionPrompt />
      <ConfirmDialog
        isOpen={openUpdateModal}
        onDelete={submitlEditAction}
        onCancel={onCloseDialog}
        title="企業データを保存します"
        message="保存すると完全に上書きされ、復元できません。よろしいですか？"
        submitLabel="保存する"
      />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState) => ({
  cityList: state.city as CityState[],
  workplaceCompany: state.offsiteWork.workplaceCompany,
  errorOffsiteWork: state.errors.offsiteWork
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { offsiteWorkDispatch, uiDispatch, cityDispatch } = dispatches;
  const offsiteWorkDispatcher = offsiteWorkDispatch(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  const cityDispatches = cityDispatch(dispatch);

  return {
    fetchWorkplaceCompany: offsiteWorkDispatcher.fetchWorkplaceCompany,
    clearWorkplaceCompany: offsiteWorkDispatcher.clearWorkplaceCompany,
    postWorkplaceCompany: offsiteWorkDispatcher.postWorkplaceCompany,
    deleteWorkplaceCompany: offsiteWorkDispatcher.deleteWorkplaceCompany,
    stopHistory: uiDispatches.stopHistory,
    fetchCity: async (params: CityParams) => {
      await cityDispatches.fetch({
        prefectureName: params.prefectureName
      });
    }
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(WorkplaceCompanyEdit)
);
