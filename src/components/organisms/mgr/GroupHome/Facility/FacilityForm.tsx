import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { Formik, Form, FormikActions } from "formik";
import initialValues, {
  FacilityValues
} from "@initialize/mgr/GroupHome/facility/initialValues";
import validation from "@initialize/mgr/GroupHome/facility/validation";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import BasicFields from "@components/organisms/mgr/GroupHome/Facility/BasicFields";
import SubtractionItemFields from "@components/organisms/mgr/common/Facility/SubtractionItemFields";
import AdditionalItemFields from "@components/organisms/mgr/GroupHome/Facility/AdditionalItemFields";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { FacilityState } from "@stores/domain/mgr/GroupHome/facility/types";
import { CityState, CityParams } from "@stores/domain/city/type";
import { SnackbarParams } from "@stores/ui/type";
import { toEffectiveObject } from "@utils/object";
import deepEqual from "fast-deep-equal";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: 0
    }
  });

interface DispatchProps {
  fetchFacility: () => Promise<void>;
  postFacility: (values: FacilityValues) => void;
  fetchCity: (params: CityParams) => Promise<void>;
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

class FacilityForm extends React.Component<Props, State> {
  public unmount = false;
  public state = {
    initialValues: initialValues(),
    isFetchDone: false
  };

  public async componentDidMount() {
    await this.props.fetchFacility();
    if (this.props.facility.selectedPrefectureName !== "") {
      await this.props.fetchCity({
        prefectureName: this.props.facility.selectedPrefectureName
      });
    }
    if (!this.unmount) {
      this.setState({
        initialValues: initialValues(this.props.facility),
        isFetchDone: true
      });
    }
  }

  public componentDidUpdate(prevProps: Props) {
    // 再取得時、formを更新
    if (
      this.state.isFetchDone &&
      !deepEqual(this.props.facility, prevProps.facility)
    ) {
      this.setState({ initialValues: initialValues(this.props.facility) });
    }
  }

  public componentWillUnmount() {
    this.unmount = true;
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
              facilityType={this.props.facility.groupHomeType}
              formikProps={formikProps}
            />
            {/* 減算対象項目 */}
            <SubtractionItemFields formikProps={formikProps} />
            {/* 加算対象項目 */}
            <AdditionalItemFields
              formikProps={formikProps}
              groupHomeType={this.props.facility.groupHomeType}
            />
          </Form>
        )}
      </Formik>
    );
  }

  private confirmDiscardFormChanges(nextValues: FacilityValues) {
    const hasChange = !deepEqual(nextValues, this.state.initialValues);
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
    await this.props.postFacility(values);
    actions.setSubmitting(false);
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { cityDispatch, uiDispatch, GroupHome } = dispatches;
  const facilityDispatcher = GroupHome.facilityDispatcher(dispatch);
  const cityDispatches = cityDispatch(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  return {
    fetchFacility: facilityDispatcher.fetch,
    postFacility: (values: FacilityValues) => facilityDispatcher.post(values),
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
  facility: state.GroupHome.facility,
  cityList: state.city,
  needsStopHistory: state.ui.needsStopHistory
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FacilityForm));
