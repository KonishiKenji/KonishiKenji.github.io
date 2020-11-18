import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikTime from "@components/molecules/FormikTime";
import {
  TRAIL_USAGE_KIND,
  SUPPLY_EXTENDED_SERVICE_LIST,
  SUPPLY_FOOD_SERVICE_LIST,
  SUPPLY_PICKUP_SERVICE_LIST,
  SEIKATSUKAIGO_IN_OUT_RECORDS_STATUS,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST0,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST1,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST2,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST3
} from "@constants/variables";
import InOutReportFormPaper from "@components/organisms/mgr/SEIKATSUKAIGO/report/dialog/InOutReportFormPaper";
import { FieldItem } from "@interfaces/ui/form";
import { FormikProps } from "formik";
import { InitialValues } from "@interfaces/mgr/SEIKATSUKAIGO/report/initial";

const styles = (): StyleRules =>
  createStyles({
    disabled: {
      color: "rgba(0, 0, 0, 0.38)"
    }
  });

interface StateProps {
  formikPropsValues: FormikProps<InitialValues>;
  isPickupAvailable: boolean;
  isFoodAvailable: boolean;
  isSevereFailureSupport: boolean;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

interface State {
  isTrialUsageKindDisplay: boolean;
  isTimeInputDisabled: boolean;
  isExtendedDisabled: boolean;
  isDidGetFoodDisablead: boolean;
  isTravelTimeDisabled: boolean;
  isPickupPremisesDisabled: boolean;
  pickupPremisesList: FieldItem[];
  pickupValue: string;
  pickupPremisesValue: string;
  isSevereDisabilitySupportDisabled: boolean;
}

type Props = StateProps & WithStyles<typeof styles>;

class InOutReportDialogFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { formikPropsValues } = this.props;
    this.state = {
      isTrialUsageKindDisplay: false,
      isTimeInputDisabled: true,
      isExtendedDisabled: true,
      isDidGetFoodDisablead: true,
      isTravelTimeDisabled: true,
      isPickupPremisesDisabled: true,
      pickupValue: formikPropsValues.values.initial.travelTime,
      pickupPremisesValue: formikPropsValues.values.initial.pickupPremises,
      pickupPremisesList: SUPPLY_PICKUP_PREMISES_SERVICE_LIST0,
      isSevereDisabilitySupportDisabled: true
    };
  }

  public componentDidMount(): void {
    this.changeState(this.props.formikPropsValues.values.initial.status);
    this.changePickupPremisesState(
      this.props.formikPropsValues.values.initial.travelTime
    );
    if (
      this.props.formikPropsValues.values.initial.status === "2" &&
      this.props.formikPropsValues.values.initial.travelTime !== "0"
    ) {
      this.setState({ isPickupPremisesDisabled: false });
    } else {
      this.setState({ isPickupPremisesDisabled: true });
    }
  }

  private handleChangeStatusHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.props.setFormikFieldValue("initial.trialUsageKind", "1");
    this.props.setFormikFieldValue(
      "initial.lifeSupportHubInDistrictFlg",
      false
    );
    this.props.setFormikFieldValue("initial.extended", "0");
    // サービス提供の状況が通所の時のデフォルト設定
    if (e.target.value === "2") {
      this.changePickupPremisesState(
        this.props.formikPropsValues.values.initial.travelTime
      );
      this.props.setFormikFieldValue("initial.severeDisabilitySupport", true);
    } else {
      this.setState({ isPickupPremisesDisabled: true });
    }
    this.changeState(e.target.value);
  };

  // リアルタイムにバリデーションを行いたい為、onChangeごとにFormikの更新を行う
  private handleChangeInitialTime = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    beforeValue: string,
    autoCorrectValue: string
  ): string | void => {
    this.props.setFormikFieldValue(event.target.name, autoCorrectValue);
  };

  // リアルタイムにバリデーションを行いたい為、onChangeごとにFormikの更新を行う
  private onChangeText = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): string | void => {
    this.props.setFormikFieldValue(event.target.name, event.target.value);
  };

  private handleChangePickupHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.props.setFormikFieldValue(
      "initial.pickupPremises",
      e.target.value === this.state.pickupValue
        ? this.state.pickupPremisesValue
        : "0"
    );

    this.changePickupPremisesState(e.target.value);
  };

  private changeState = (status: string): void => {
    // 一度表示の初期化
    this.setState({
      isTimeInputDisabled: true,
      isExtendedDisabled: true,
      isDidGetFoodDisablead: true,
      isTravelTimeDisabled: true,
      isTrialUsageKindDisplay: false,
      isSevereDisabilitySupportDisabled: true
    });

    // 通所の場合
    if (status === "2") {
      this.setState({
        isTimeInputDisabled: false,
        isExtendedDisabled: false,
        isDidGetFoodDisablead: false,
        isTravelTimeDisabled: false,
        isSevereDisabilitySupportDisabled: false
      });
    }

    // 訪問の場合
    if (status === "6") {
      this.setState({ isTimeInputDisabled: false });
    }
    // 体験利用の場合
    if (status === "7") {
      this.setState({ isTrialUsageKindDisplay: true });
    }
  };

  private changePickupPremisesState = (pickupValue: string): void => {
    if (pickupValue !== "0") {
      let pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST0;
      switch (pickupValue) {
        case "1":
          pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST1;
          break;
        case "2":
          pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST2;
          break;
        case "3":
          pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST3;
          break;
        default:
      }
      this.setState({ pickupPremisesList, isPickupPremisesDisabled: false });
    } else {
      this.setState({ isPickupPremisesDisabled: true });
    }
  };

  public render(): JSX.Element {
    return (
      <InOutReportFormPaper>
        <FormGroup row>
          <FormikSelect
            name="initial.status"
            label="サービス提供の状況"
            required
            options={SEIKATSUKAIGO_IN_OUT_RECORDS_STATUS}
            size="smallMedium"
            onChangeHook={this.handleChangeStatusHook}
          />
          {this.state.isTrialUsageKindDisplay && (
            <div>
              <FormikSelect
                name="initial.trialUsageKind"
                label="体験利用支援種別"
                required
                options={TRAIL_USAGE_KIND}
                size="medium"
                style={{ marginBottom: 12, width: "335px" }}
              />
              <FormikCheckbox
                name="initial.lifeSupportHubInDistrictFlg"
                label="地域生活支援拠点"
              />
            </div>
          )}
        </FormGroup>
        <FormGroup row>
          <FormikTime
            name="initial.inTime"
            label="開始時間"
            required={!this.state.isTimeInputDisabled}
            placeholder="00:00"
            size="smallMedium"
            maxLength={5}
            disabled={this.state.isTimeInputDisabled}
            error={
              this.props.formikPropsValues.errors &&
              this.props.formikPropsValues.errors.initial
                ? this.props.formikPropsValues.errors.initial.inTime !==
                  undefined
                : false
            }
            onChangeHookTime={this.handleChangeInitialTime}
          />
          <FormikTime
            name="initial.outTime"
            label="終了時間"
            placeholder="00:00"
            size="smallMedium"
            maxLength={5}
            disabled={this.state.isTimeInputDisabled}
            error={
              this.props.formikPropsValues.errors &&
              this.props.formikPropsValues.errors.initial
                ? this.props.formikPropsValues.errors.initial.outTime !==
                  undefined
                : false
            }
            onChangeHookTime={this.handleChangeInitialTime}
          />
        </FormGroup>
        <FormikSelect
          name="initial.extended"
          label="延長支援"
          size="smallMedium"
          disabled={this.state.isExtendedDisabled}
          options={SUPPLY_EXTENDED_SERVICE_LIST}
          FormLabelClasses={
            this.state.isExtendedDisabled
              ? { root: this.props.classes.disabled }
              : undefined
          }
        />
        {this.props.isFoodAvailable && (
          <FormikSelect
            name="initial.didGetFood"
            label="食事提供"
            size="smallMedium"
            disabled={this.state.isDidGetFoodDisablead}
            options={SUPPLY_FOOD_SERVICE_LIST}
            FormLabelClasses={
              this.state.isDidGetFoodDisablead
                ? { root: this.props.classes.disabled }
                : undefined
            }
          />
        )}
        {this.props.isPickupAvailable && (
          <FormGroup row>
            <FormikSelect
              name="initial.travelTime"
              label="送迎"
              size="smallMedium"
              disabled={this.state.isTravelTimeDisabled}
              options={SUPPLY_PICKUP_SERVICE_LIST}
              onChangeHook={this.handleChangePickupHook}
              FormLabelClasses={
                this.state.isTravelTimeDisabled
                  ? { root: this.props.classes.disabled }
                  : undefined
              }
            />
            <FormikSelect
              name="initial.pickupPremises"
              label="同一敷地内送迎"
              size="smallMedium"
              options={this.state.pickupPremisesList}
              disabled={this.state.isPickupPremisesDisabled}
              FormLabelClasses={
                this.state.isPickupPremisesDisabled
                  ? { root: this.props.classes.disabled }
                  : undefined
              }
            />
          </FormGroup>
        )}
        {this.props.isSevereFailureSupport &&
          this.props.formikPropsValues.values.initial
            .isSevereDisabilitySupport && (
            <FormikCheckbox
              name="initial.severeDisabilitySupport"
              label="重度障害者支援（個別支援）を実施"
              disabled={this.state.isSevereDisabilitySupportDisabled}
            />
          )}
        <FormikTextField
          name="initial.memo"
          label="備考"
          size="quarterSuperLong"
          style={{ marginBottom: 48 }}
          error={
            this.props.formikPropsValues.errors &&
            this.props.formikPropsValues.errors.initial
              ? this.props.formikPropsValues.errors.initial.memo !== undefined
              : false
          }
          multiline
          onChangeHook={this.onChangeText}
        />
      </InOutReportFormPaper>
    );
  }
}

export default withStyles(styles)(InOutReportDialogFields);
