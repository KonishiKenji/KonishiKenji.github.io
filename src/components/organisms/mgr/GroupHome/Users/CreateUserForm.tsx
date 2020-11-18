import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { Formik, Form, FormikActions } from "formik";
import initialValues, {
  UsersValues
} from "@initialize/mgr/GroupHome/users/initialValues";
import validation from "@initialize/mgr/GroupHome/users/validation";
import Button from "@material-ui/core/Button";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import BasicFields from "@components/organisms/mgr/common/Users/BasicFields";
import ServiceUseFields from "@components/organisms/mgr/GroupHome/Users/ServiceUseFields";
import RecipientCertificateFields from "@components/organisms/mgr/GroupHome/Users/RecipientCertificateFields";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { CityState, CityParams } from "@stores/domain/city/type";
import { FacilityState } from "@stores/domain/mgr/GroupHome/facility/types";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import * as URL from "@constants/url";
import * as H from "history";
import { FieldItem } from "@interfaces/ui/form";
import generateSelectFieldItems from "@utils/dataNormalizer/generateSelectFieldItems";

const styles = ({ spacing }: Theme): StyleRules =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: 0
    },
    cancelButton: {
      marginRight: spacing.unit,
      boxShadow: "none"
    }
  });

type OwnProps = RouteComponentProps & WithStyles<typeof styles>;

interface DispatchProps {
  createUser: (
    values: UsersValues,
    history: H.History,
    operatingUnitFlg: boolean
  ) => void;
  fetchCity: (params: CityParams) => void;
  showSnackbar: (params: SnackbarParams) => void;
  stopHistory: (flag: boolean) => void;
  fetchFacility: () => void;
}

interface StateProps {
  cityList: CityState[];
  needsStopHistory: boolean;
  facility: FacilityState;
}

interface MergeProps extends DispatchProps, StateProps, OwnProps {
  unitsOptions: FieldItem[];
}

class CreateUserForm extends React.Component<MergeProps> {
  private submitError = (): void => {
    this.props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  private validate = (values: UsersValues): void | object => {
    const validationResult = validation(
      values,
      this.props.facility.operatingUnitFlag
    );
    const error = toEffectiveObject(validationResult);
    if (!this.props.needsStopHistory) {
      this.props.stopHistory(true);
    }
    return error;
  };

  private onSubmit = async (
    values: UsersValues,
    actions: FormikActions<UsersValues>
  ): Promise<void> => {
    actions.setSubmitting(true);
    await this.props.createUser(
      values,
      this.props.history,
      this.props.facility.operatingUnitFlag
    );
    actions.setSubmitting(false);
  };

  private onCancel = (): void => {
    this.props.history.push(URL.USERS);
  };

  public componentDidMount(): void {
    this.props.fetchFacility();
  }

  public render(): JSX.Element {
    return (
      <Formik
        initialValues={initialValues()}
        validate={this.validate}
        onSubmit={this.onSubmit}
      >
        {(formikProps): JSX.Element => (
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
              unitsOptions={this.props.unitsOptions}
              isUnitOperating={this.props.facility.operatingUnitFlag}
            />
            {/* 受給者証の詳細 */}
            <RecipientCertificateFields />
          </Form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  cityList: state.city,
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
    createUser: userInFacilityDispatcher.create,
    fetchCity: async (params: CityParams): Promise<void> => {
      await cityDispatches.fetch({
        prefectureName: params.prefectureName
      });
    },
    showSnackbar: (params: SnackbarParams): void =>
      uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory,
    fetchFacility: facilityDispatcher.fetch
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
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateUserForm)
);
