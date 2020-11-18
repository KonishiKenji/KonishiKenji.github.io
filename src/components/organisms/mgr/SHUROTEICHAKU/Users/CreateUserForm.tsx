import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { Formik, Form, FormikActions } from "formik";
import initialValues, {
  UsersValues
} from "@initialize/mgr/SHUROTEICHAKU/users/initialValues";
import validation from "@initialize/mgr/SHUROTEICHAKU/users/validation";
import Button from "@material-ui/core/Button";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import BasicFields from "@components/organisms/mgr/SHUROTEICHAKU/Users/BasicFields";
import ServiceUseFields from "@components/organisms/mgr/SHUROTEICHAKU/Users/ServiceUseFields";
import RecipientCertificateFields from "@components/organisms/mgr/SHUROTEICHAKU/Users/RecipientCertificateFields";
import CompaniesFields from "@components/organisms/mgr/SHUROTEICHAKU/Users/CompaniesFields";
import dispatches from "@stores/dispatches";
import { CityState, CityParams } from "@stores/domain/city/type";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import * as URL from "@constants/url";
import isEqual from "lodash-es/isEqual";
import * as H from "history";
import { AppState } from "@stores/type";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: 0
    },
    cancelButton: {
      marginRight: spacing.unit,
      boxShadow: "none",
      color: "#0277bd",
      border: "solid 1px rgba(0, 0, 0, 0.12)",
      backgroundColor: "rgba(98, 2, 238, 0)"
    }
  });

interface DispatchProps {
  createUser: (values: UsersValues, history: H.History) => void;
  fetchCity: (params: CityParams) => void;
  showSnackbar: (params: SnackbarParams) => void;
  stopHistory: (flag: boolean) => void;
}

interface StateProps {
  cityList: CityState[];
  needsStopHistory: boolean;
}

type Props = DispatchProps &
  StateProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

class CreateUserForm extends React.Component<Props> {
  public state = {
    initialValues: initialValues()
  };

  public render() {
    return (
      <Formik
        initialValues={initialValues()}
        validate={this.validate}
        onSubmit={this.onSubmit}
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
            <BasicFields
              formikProps={formikProps}
              setFormikFieldValue={formikProps.setFieldValue}
            />
            {/* サービス利用詳細 */}
            <ServiceUseFields
              formikProps={formikProps}
              setFormikFieldValue={formikProps.setFieldValue}
            />
            {/* 受給者証の詳細 */}
            <RecipientCertificateFields
              setFormikFieldValue={formikProps.setFieldValue}
            />
            {/* 就職先情報 */}
            <CompaniesFields
              formikProps={formikProps}
              setFormikFieldValue={formikProps.setFieldValue}
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

  private onSubmit = async (
    values: UsersValues,
    actions: FormikActions<UsersValues>
  ) => {
    actions.setSubmitting(true);
    await this.props.createUser(values, this.props.history);
    actions.setSubmitting(false);
  };

  private onCancel = () => {
    this.props.history.push(URL.USERS);
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  cityList: state.city,
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { SHUROTEICHAKU, cityDispatch, uiDispatch } = dispatches;
  const userInFacilityDispatcher = SHUROTEICHAKU.userInFacilityDispatcher(
    dispatch
  );
  const cityDispatches = cityDispatch(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  return {
    createUser: userInFacilityDispatcher.create,
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
)(withStyles(styles)(CreateUserForm));
