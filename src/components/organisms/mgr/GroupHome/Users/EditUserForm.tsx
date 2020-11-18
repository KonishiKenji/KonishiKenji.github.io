import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { Formik, Form, FormikActions } from "formik";
import initialValues, {
  UsersValues
} from "@initialize/mgr/GroupHome/users/initialValues";
import validation from "@initialize/mgr/GroupHome/users/validation";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import MessageDialog from "@components/molecules/dialog/MessageDialog";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import BasicFields from "@components/organisms/mgr/common/Users/BasicFields";
import ServiceUseFields from "@components/organisms/mgr/GroupHome/Users/ServiceUseFields";
import RecipientCertificateFields from "@components/organisms/mgr/GroupHome/Users/RecipientCertificateFields";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { UsersInFacilityState } from "@stores/domain/mgr/GroupHome/userInFacility/types";
import { CityState, CityParams } from "@stores/domain/city/type";
import { FacilityState } from "@stores/domain/mgr/GroupHome/facility/types";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import * as H from "history";
import * as URL from "@constants/url";
import deepEqual from "fast-deep-equal";
import { FieldItem } from "@interfaces/ui/form";
import generateSelectFieldItems from "@utils/dataNormalizer/generateSelectFieldItems";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: 0
    },
    cancelButton: {
      marginRight: spacing.unit,
      boxShadow: "none"
    },
    footer: {
      display: "inline-block",
      margin: "0 24px 80px"
    },
    deleteButton: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      color: "#0277bd"
    },
    deleteButtonText: {
      marginLeft: 8,
      fontSize: 14
    },
    dialogCancelButton: {
      width: 138
    },
    dialogActionButton: {
      width: 138,
      color: "#b00020"
    }
  });

type OwnProps = RouteComponentProps<{ id: string }> & WithStyles<typeof styles>;

interface DispatchProps {
  updateUser: (
    values: UsersValues,
    history: H.History,
    params: UsersInFacilityState["user"],
    operatingUnitFlag: boolean
  ) => void;
  fetchOne: (id: string) => void;
  deleteUser: (uiId: number, history: H.History) => void;
  fetchCity: (params: CityParams) => void;
  showSnackbar: (params: SnackbarParams) => void;
  stopHistory: (flag: boolean) => void;
  fetchFacility: () => void;
}

interface StateProps {
  cityList: CityState[];
  userInFacility: UsersInFacilityState;
  needsStopHistory: boolean;
  facility: FacilityState;
}

interface MergeProps extends DispatchProps, StateProps, OwnProps {
  unitsOptions: FieldItem[];
}

interface State {
  initialValues: UsersValues;
  isFetchDone: boolean;
  isShowDeleteDialog: boolean;
}

class EditUserForm extends React.Component<MergeProps, State> {
  public state = {
    initialValues: initialValues(),
    isFetchDone: false,
    isShowDeleteDialog: false
  };

  public async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.fetchOne(id);
    this.setState({
      initialValues: initialValues(this.props.userInFacility.user)
    });
    const prefectureName = this.props.userInFacility.user.user_in_facility
      .prefecture_name;
    if (prefectureName) {
      await this.props.fetchCity({ prefectureName });
    }
    await this.props.fetchFacility();
    this.setState({ isFetchDone: true });
  }

  public render() {
    const {
      name_mei,
      name_sei
    } = this.props.userInFacility.user.user_in_facility;
    const userName = `${name_sei} ${name_mei}`;
    const { classes } = this.props;
    return (
      <>
        <Formik
          initialValues={this.state.initialValues}
          validate={this.validate}
          onSubmit={this.onSubmit}
          enableReinitialize={true}
        >
          {formikProps => (
            <Form>
              <ContentHeader
                position="sticky"
                classes={{ wrapper: this.props.classes.wrapper }}
              >
                <ContentHeaderRight>
                  <Button
                    className={this.props.classes.cancelButton}
                    variant="contained"
                    color="secondary"
                    onClick={this.onCancel}
                  >
                    キャンセル
                  </Button>
                  <FormikSubmitButton
                    buttonName="保存する"
                    formikProps={formikProps}
                    errorAction={this.submitError}
                  />
                </ContentHeaderRight>
              </ContentHeader>
              {/* 基本情報 */}
              <BasicFields formikProps={formikProps} />
              {/* サービス利用詳細 */}
              <ServiceUseFields
                formikProps={formikProps}
                isFetchDone={this.state.isFetchDone}
                unitsOptions={this.props.unitsOptions}
                isUnitOperating={this.props.facility.operatingUnitFlag}
              />
              {/* 受給者証の詳細 */}
              <RecipientCertificateFields />
            </Form>
          )}
        </Formik>
        <div className={classes.footer}>
          <div
            className={classes.deleteButton}
            onClick={this.onShowDeleteDialog}
          >
            <DeleteIcon />
            <span className={classes.deleteButtonText}>削除する</span>
          </div>
        </div>
        <MessageDialog
          isOpen={this.state.isShowDeleteDialog}
          title={`${userName}さんの利用者情報を削除しますか？`}
          message={`${userName}さんの利用者情報を削除します。削除すると過去に登録した「利用実績」などのすべてのデータが完全に削除され、復元できません。削除してよろしいですか？`}
          closeButton={
            <Button
              onClick={this.onCloseDeleteDialog}
              className={classes.dialogCancelButton}
              color="secondary"
            >
              キャンセル
            </Button>
          }
          actionButton={
            <Button
              onClick={this.onDelete}
              className={classes.dialogActionButton}
            >
              削除する
            </Button>
          }
        />
      </>
    );
  }

  private confirmDiscardFormChanges(nextValues: UsersValues) {
    const hasChange = !deepEqual(nextValues, this.state.initialValues);
    if (hasChange) {
      this.props.stopHistory(true);
    }
  }

  private validate = (values: UsersValues) => {
    const validationResult = validation(
      values,
      this.props.facility.operatingUnitFlag
    );
    const error = toEffectiveObject(validationResult);
    if (!this.props.needsStopHistory) {
      this.confirmDiscardFormChanges(values);
    }
    return error;
  };

  private submitError = () => {
    this.props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  private onSubmit = async (
    values: UsersValues,
    actions: FormikActions<UsersValues>
  ) => {
    actions.setSubmitting(true);
    await this.props.updateUser(
      values,
      this.props.history,
      this.props.userInFacility.user,
      this.props.facility.operatingUnitFlag
    );
    actions.setSubmitting(false);
  };

  private onCancel = () => {
    this.props.history.push(URL.USERS);
  };

  private onShowDeleteDialog = () => {
    this.setState({ isShowDeleteDialog: true });
  };

  private onCloseDeleteDialog = () => {
    this.setState({ isShowDeleteDialog: false });
  };

  private onDelete = () => {
    this.onCloseDeleteDialog();
    const uidId = this.props.userInFacility.user.user_in_facility.id;
    // idは必ずあるが、定義上の問題
    if (uidId) {
      this.props.deleteUser(uidId, this.props.history);
    }
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  cityList: state.city,
  userInFacility: state.GroupHome.userInFacility,
  needsStopHistory: state.ui.needsStopHistory,
  facility: state.GroupHome.facility
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { GroupHome, cityDispatch, uiDispatch } = dispatches;
  const userInFacilityDispatcher = GroupHome.userInFacilityDispatcher(dispatch);
  const cityDispatches = cityDispatch(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  const facilityDispatcher = GroupHome.facilityDispatcher(dispatch);

  return {
    updateUser: userInFacilityDispatcher.update,
    fetchOne: userInFacilityDispatcher.fetchOne,
    deleteUser: userInFacilityDispatcher.deleteUser,
    fetchFacility: facilityDispatcher.fetch,
    fetchCity: async (params: CityParams) => {
      await cityDispatches.fetch({
        prefectureName: params.prefectureName
      });
    },
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): MergeProps => {
  const unitsOptions = generateSelectFieldItems(
    stateProps.facility.units || [],
    "unit_name",
    "id"
  );
  return {
    unitsOptions,
    ...dispatchProps,
    ...stateProps,
    ...ownProps
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(EditUserForm)
);
