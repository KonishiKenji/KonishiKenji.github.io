import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { Formik, Form, FormikActions } from "formik";
import initialValues, {
  FacilityValues
} from "@initialize/mgr/IAB/facility/initialValues";
import validation from "@initialize/mgr/IAB/facility/validation";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import BasicFields from "@components/organisms/mgr/IAB/facility/BasicFields";
import SubtractionItemFields from "@components/organisms/mgr/IAB/facility/SubtractionItemFields";
import AdditionalItemFields from "@components/organisms/mgr/IAB/facility/AdditionalItemFields";
import dispatches from "@stores/dispatches";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { UserState } from "@stores/domain/user/type";
import { CityState, CityParams } from "@stores/domain/city/type";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import isEqual from "lodash-es/isEqual";
import AdministrationScheduleFields from "@components/organisms/mgr/IAB/facility/AdministrationScheduleFields";
import WorkingTimeFields from "@components/organisms/mgr/IAB/facility/WorkingTimeFields";
import { AppState } from "@stores/type";

const styles = ({ spacing }: Theme): StyleRules =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: 0
    }
  });

type OwnProps = WithStyles<typeof styles>;

interface DispatchProps {
  fetchFacility: () => void;
  fetchCity: (params: CityParams) => void;
  postFacility: (
    params: FacilityValues,
    beforeValue: FacilityValues,
    facility: FacilityState
  ) => void;
  fetchErrorsSummary: () => void;
  showSnackbar: (params: SnackbarParams) => void;
  stopHistory: (flag: boolean) => void;
}

interface StateProps {
  facility: FacilityState;
  user: UserState;
  cityList: CityState[];
  needsStopHistory: boolean;
}

type Props = OwnProps & DispatchProps & StateProps;

interface State {
  initialValues: FacilityValues;
  isFetchDone: boolean;
}

class CreateFacilityForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      initialValues: initialValues(),
      isFetchDone: false
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.props.fetchFacility();
    this.setState({
      initialValues: initialValues(this.props.facility)
    });
    if (this.props.facility.selectedPrefectureName !== "") {
      await this.props.fetchCity({
        prefectureName: this.props.facility.selectedPrefectureName
      });
    }
    this.setState({ isFetchDone: true });
  }

  private validate = (values: FacilityValues): void | object => {
    const validationResult = validation(values, this.props.user.featureGroup);
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
    values: FacilityValues,
    actions: FormikActions<FacilityValues>
  ): Promise<void> => {
    actions.setSubmitting(true);
    await this.props.postFacility(
      values,
      this.state.initialValues,
      this.props.facility
    );
    await this.props.fetchFacility();
    await this.props.fetchErrorsSummary();
    this.setState({
      initialValues: initialValues(this.props.facility)
    });
    actions.setSubmitting(false);
  };

  private confirmDiscardFormChanges(nextValues: FacilityValues): void {
    const hasChange = !isEqual(nextValues, this.state.initialValues);
    if (hasChange) {
      this.props.stopHistory(true);
    }
  }

  public render(): JSX.Element {
    return (
      <Formik
        initialValues={this.state.initialValues}
        validate={this.validate}
        onSubmit={this.onSubmit}
        enableReinitialize
      >
        {(formikProps) => (
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
            {/* 基本情報 */}
            <BasicFields
              isFetchDone={this.state.isFetchDone}
              formikProps={formikProps}
              setFormikFieldValue={formikProps.setFieldValue}
            />
            {/* 営業スケジュール */}
            <AdministrationScheduleFields formikProps={formikProps} />
            {/* 作業時間 ※ */}
            {this.props.user.featureGroup.group_labor_charge === 1 && (
              <WorkingTimeFields formikProps={formikProps} />
            )}
            {/* 減算対象項目 */}
            <SubtractionItemFields formikProps={formikProps} />
            {/* 加算対象項目 */}
            <AdditionalItemFields
              formikProps={formikProps}
              setFormikFieldValue={formikProps.setFieldValue}
            />
          </Form>
        )}
      </Formik>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { cityDispatch, uiDispatch, IAB, errorsDispatcher } = dispatches;
  const facilityDispatcher = IAB.facilityDispatcher(dispatch);
  const cityDispatches = cityDispatch(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  return {
    fetchFacility: facilityDispatcher.fetch,
    fetchErrorsSummary: errorsDispatcher(dispatch).summary,
    postFacility: (
      values: FacilityValues,
      beforeValue: FacilityValues,
      facility: FacilityState
    ): Promise<void> => facilityDispatcher.post(values, beforeValue, facility),
    fetchCity: async (params: CityParams): Promise<void> => {
      await cityDispatches.fetch({
        prefectureName: params.prefectureName
      });
    },
    showSnackbar: (params: SnackbarParams): void =>
      uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory
  };
};

const mapStateToProps = (state: AppState): StateProps => ({
  facility: state.IAB.facility,
  user: state.user as UserState,
  cityList: state.city as CityState[],
  needsStopHistory: state.ui.needsStopHistory
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CreateFacilityForm)
);
