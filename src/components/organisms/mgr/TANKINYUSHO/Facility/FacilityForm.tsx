import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { Formik, Form, FormikActions } from "formik";
import initialValues, {
  FacilityValues
} from "@initialize/mgr/TANKINYUSHO/facility/initialValues";
import validation from "@initialize/mgr/TANKINYUSHO/facility/validation";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import BasicFields from "@components/organisms/mgr/TANKINYUSHO/Facility/BasicFields";
import SubtractionItemFields from "@components/organisms/mgr/TANKINYUSHO/Facility/SubtractionItemFields";
import AdditionalItemFields from "@components/organisms/mgr/TANKINYUSHO/Facility/AdditionalItemFields";
import dispatches from "@stores/dispatches";
import { FacilityState } from "@stores/domain/mgr/TANKINYUSHO/facility/types";
import { CityState, CityParams } from "@stores/domain/city/type";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import isEqual from "lodash-es/isEqual";
import { AppState } from "@stores/type";
const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: 0
    }
  });

interface DispatchProps {
  fetchFacility: () => void;
  fetchCity: (params: CityParams) => void;
  postFacility: (params: FacilityValues, facility: FacilityValues) => void;
  showSnackbar: (params: SnackbarParams) => void;
  stopHistory: (flag: boolean) => void;
}

interface StateProps {
  facility: FacilityState;
  cityList: CityState[];
  needsStopHistory: boolean;
}

type Props = DispatchProps & StateProps & WithStyles<typeof styles>;

interface State {
  initialValues: FacilityValues;
  isFetchDone: boolean;
}

class CreateFacilityForm extends React.Component<Props, State> {
  public state = {
    initialValues: initialValues(),
    isFetchDone: false
  };

  public async componentDidMount() {
    await this.props.fetchFacility();
    this.setState({
      initialValues: initialValues(this.props.facility)
    });
    if (this.props.facility.selectedPrefectureName !== "") {
      await this.props.fetchCity({
        prefectureName: this.props.facility.selectedPrefectureName
      });
    }
    // 初期化処理終了時に以下の処理を行うため、setStateを分けている
    this.setState({ isFetchDone: true });
  }

  public render() {
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
              serviceType={this.props.facility.serviceType}
              formikProps={formikProps}
              setFormikFieldValue={formikProps.setFieldValue}
            />
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

  private confirmDiscardFormChanges(nextValues: FacilityValues) {
    const hasChange = !isEqual(nextValues, this.state.initialValues);
    if (hasChange) {
      this.props.stopHistory(true);
    }
  }

  private validate = (values: FacilityValues) => {
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
    values: FacilityValues,
    actions: FormikActions<FacilityValues>
  ) => {
    actions.setSubmitting(true);
    await this.props.postFacility(values, initialValues(this.props.facility));
    actions.setSubmitting(false);
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { cityDispatch, uiDispatch, TANKINYUSHO } = dispatches;
  const facilityDispatcher = TANKINYUSHO.facilityDispatcher(dispatch);
  const cityDispatches = cityDispatch(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  return {
    fetchFacility: facilityDispatcher.fetch,
    postFacility: (values: FacilityValues, facility: FacilityValues) =>
      facilityDispatcher.post(values, facility),
    fetchCity: async (params: CityParams) => {
      await cityDispatches.fetch({
        prefectureName: params.prefectureName
      });
    },
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory
  };
};

const mapStateToProps = (state: AppState): StateProps => ({
  facility: state.TANKINYUSHO.facility,
  cityList: state.city,
  needsStopHistory: state.ui.needsStopHistory
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateFacilityForm));
