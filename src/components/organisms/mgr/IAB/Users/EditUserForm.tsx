import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { Formik, Form, FormikActions } from "formik";
import initialValues, {
  UsersValues
} from "@initialize/mgr/IAB/users/initialValues";
import validation from "@initialize/mgr/IAB/users/validation";
import Button from "@material-ui/core/Button";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import BasicFields from "@components/organisms/mgr/IAB/Users/BasicFields";
import ServiceUseFields from "@components/organisms/mgr/IAB/Users/ServiceUseFields";
import RecipientCertificateFields from "@components/organisms/mgr/IAB/Users/RecipientCertificateFields";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { UsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import { CityState, CityParams } from "@stores/domain/city/type";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import ConfirmDialog from "@components/atoms/ConfirmDialog";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { SECONDARY_BLUE_COLOR } from "@constants/styles";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import * as URL from "@constants/url";
import isEqual from "lodash-es/isEqual";
import * as H from "history";
import * as ClassNames from "classnames";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      height: 60,
      top: 0,
      "& > div": {
        paddingRight: 16,
        paddingLeft: 16,
        minHeight: 60
      },
      "&+section": {
        marginTop: 8
      }
    },
    cancelButton: {
      width: 120,
      marginRight: spacing.unit,
      boxShadow: "none",
      color: SECONDARY_BLUE_COLOR,
      border: "solid 1px rgba(0, 0, 0, 0.12)",
      backgroundColor: "rgba(98, 2, 238, 0)",
      position: "absolute"
    },
    deleteButton: {
      boxShadow: "none",
      color: SECONDARY_BLUE_COLOR,
      backgroundColor: "rgba(98, 2, 238, 0)",
      padding: "6px 6px 6px 0px",
      marginLeft: 16
    },
    deleteOutline: {
      color: SECONDARY_BLUE_COLOR,
      marginRight: 7
    },
    button: {
      width: 120
    }
  });

interface DispatchProps {
  updateUser: (
    values: UsersValues,
    history: H.History,
    params: UsersInFacilityState["user"],
    facility: FacilityState
  ) => void;
  fetchOne: (id: string) => void;
  fetchCity: (params: CityParams) => void;
  showSnackbar: (params: SnackbarParams) => void;
  clear: (id: string, history: H.History) => void;
  fetchFacility: () => void;
  stopHistory: (flag: boolean) => void;
}

interface StateProps {
  facility: FacilityState;
  cityList: CityState[];
  userInFacility: UsersInFacilityState;
  needsStopHistory: boolean;
}

type Props = DispatchProps &
  StateProps &
  RouteComponentProps<{ id: string }> &
  WithStyles<typeof styles>;

interface State {
  initialValues: UsersValues;
  isFetchDone: boolean;
  openModal: boolean;
}

class EditUserForm extends React.Component<Props, State> {
  public state = {
    initialValues: initialValues(),
    isFetchDone: false,
    openModal: false
  };

  public async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.fetchFacility();
    await this.props.fetchOne(id);
    this.setState({
      initialValues: initialValues(this.props.userInFacility.user)
    });
    const prefectureName = this.props.userInFacility.user.user_in_facility
      .prefecture_name;
    if (prefectureName) {
      await this.props.fetchCity({ prefectureName });
    }
    this.setState({ isFetchDone: true });
  }

  public render() {
    const name_sei = this.props.userInFacility.user.user_in_facility.name_sei;
    const name_mei = this.props.userInFacility.user.user_in_facility.name_mei;
    return (
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
                  className={ClassNames(
                    this.props.classes.cancelButton,
                    this.props.classes.button
                  )}
                  variant="contained"
                  onClick={this.onCancel}
                >
                  戻る
                </Button>
                <FormikSubmitButton
                  buttonName="保存する"
                  formikProps={formikProps}
                  errorAction={this.submitError}
                  className={this.props.classes.button}
                />
              </ContentHeaderRight>
            </ContentHeader>
            {/* 基本情報 */}
            <BasicFields
              formikProps={formikProps}
              setFormikFieldValue={formikProps.setFieldValue}
            />
            {/* サービス利用詳細 */}
            <ServiceUseFields
              formikProps={formikProps}
              isFetchDone={this.state.isFetchDone}
              facility={this.props.facility}
              setFormikFieldValue={formikProps.setFieldValue}
            />
            {/* 受給者証の詳細 */}
            <RecipientCertificateFields
              formikProps={formikProps}
              setFormikFieldValue={formikProps.setFieldValue}
            />
            <Button
              className={this.props.classes.deleteButton}
              variant="contained"
              onClick={this.onClear}
            >
              <DeleteOutline className={this.props.classes.deleteOutline} />
              削除する
            </Button>
            <ConfirmDialog
              isOpen={this.state.openModal}
              onDelete={this.onDelete}
              onCancel={this.handleCancel}
              title={`${name_sei}${name_mei}さんの利用者情報を削除しますか？`}
              message={`${name_sei}${name_mei}さんの利用者情報を削除します。削除すると過去に登録した「利用実績」などのすべてのデータが完全に削除され、復元できません。削除してよろしいですか？`}
            />
          </Form>
        )}
      </Formik>
    );
  }

  private confirmDiscardFormChanges(nextValues: UsersValues) {
    const hasChange = !isEqual(nextValues, this.state.initialValues);
    if (hasChange) {
      this.props.stopHistory(true);
    }
  }

  private validate = (values: UsersValues) => {
    const validationResult = validation(values);
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

  private onClear = () => {
    this.setState({ openModal: true });
  };

  private handleCancel = () => {
    this.setState({ openModal: false });
  };

  private onDelete = () => {
    const id = `${this.props.userInFacility.user.user_in_facility.id}`;
    this.props.clear(id, this.props.history);
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
      this.props.facility
    );
    actions.setSubmitting(false);
  };

  private onCancel = () => {
    this.props.history.push(URL.USERS);
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  facility: state.IAB.facility,
  cityList: state.city,
  userInFacility: state.IAB.userInFacility,
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { IAB, cityDispatch, uiDispatch } = dispatches;
  const userInFacilityDispatcher = IAB.userInFacilityDispatcher(dispatch);
  const facilityDispatcher = IAB.facilityDispatcher(dispatch);
  const cityDispatches = cityDispatch(dispatch);
  const uiDispatches = uiDispatch(dispatch);

  return {
    fetchFacility: facilityDispatcher.fetch,
    updateUser: userInFacilityDispatcher.update,
    fetchOne: userInFacilityDispatcher.fetchOne,
    clear: userInFacilityDispatcher.clear,
    fetchCity: async (params: CityParams) => {
      await cityDispatches.fetch({
        prefectureName: params.prefectureName
      });
    },
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditUserForm));
