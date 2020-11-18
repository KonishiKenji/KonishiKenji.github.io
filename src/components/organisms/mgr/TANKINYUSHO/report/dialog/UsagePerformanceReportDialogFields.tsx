import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikTextField from "@components/molecules/FormikTextField";
import {
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST0,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST1,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST2,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST3
} from "@constants/variables";
import { FormikProps } from "formik";
import { InitialValues } from "@interfaces/mgr/TANKINYUSHO/report/initial";
import {
  SUPPLY_FOOD_SERVICE_LIST,
  SUPPLY_PICKUP_SERVICE_LIST,
  CAPACITY_OVERRUN_EXCEPTION,
  MEDICAL_COOPERATION_TEXT,
  StatusType
} from "@constants/mgr/TANKINYUSHO/variables";
import { FieldItem } from "@interfaces/ui/form";
import Paper from "@material-ui/core/Paper";

const styles = (): StyleRules =>
  createStyles({
    checkbox: {
      paddingLeft: 12,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 16,
      height: 24
    },
    disabled: {
      color: "rgba(0, 0, 0, 0.38)"
    }
  });

interface StateProps {
  formikPropsValues: FormikProps<InitialValues>;
  isSevereDisabilitySupport: boolean;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

interface State {
  statusType: boolean;
  isCommute: boolean;
  enableSputumImplementationFlg: boolean;
  pickupPremisesList: FieldItem[];
  pickupValue: string;
}

type Props = StateProps & WithStyles<typeof styles>;

class UsagePerformanceReportDialogFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { formikPropsValues } = this.props;
    this.state = {
      statusType: formikPropsValues.values.initial.statusType,
      isCommute: false,
      enableSputumImplementationFlg: false,
      pickupValue: formikPropsValues.values.initial.pickup,
      pickupPremisesList: SUPPLY_PICKUP_PREMISES_SERVICE_LIST0
    };
  }

  public componentDidMount(): void {
    this.changeState(
      this.props.formikPropsValues.values.initial.statusType
        ? StatusType.IMPLEMENTATION
        : StatusType.NONE
    );
    this.changePickupPremisesState(
      this.props.formikPropsValues.values.initial.pickup
    );
    const enableSputumImplementationFlgValue =
      this.props.formikPropsValues.values.initial.statusType &&
      this.props.formikPropsValues.values.initial.medicalSupportType === "4";

    this.setState({
      enableSputumImplementationFlg: enableSputumImplementationFlgValue
    });
  }

  // サービス提供実施の値が変更されたら、checkboxの値を更新
  private handleChangeStatusHook = (): void => {
    const { statusType } = this.state;
    this.props.setFormikFieldValue(
      "initial.statusType",
      !this.state.statusType
    );
    this.setState({
      isCommute: !statusType,
      statusType: !statusType
    });

    if (!this.state.statusType) {
      this.changePickupPremisesState(
        this.props.formikPropsValues.values.initial.pickup
      );
    }
    if (
      this.props.formikPropsValues.values.initial.medicalSupportType === "4"
    ) {
      this.setState({ enableSputumImplementationFlg: true });
    }
    this.changeState(
      !this.state.statusType ? StatusType.IMPLEMENTATION : StatusType.NONE
    );
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
    if (e.target.value !== this.state.pickupValue) {
      this.props.setFormikFieldValue("initial.pickupPremises", "0");
      this.setState({ pickupValue: e.target.value });
      this.changePickupPremisesState(e.target.value);
    }
  };

  private handleChangeMedicalCooperationHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.setState({ enableSputumImplementationFlg: e.target.value === "4" });
  };

  private changeState = (status: string): void => {
    // ステータス変更時に表示非表示フラグを変更する
    const isCommute = status === StatusType.IMPLEMENTATION;
    this.setState({ isCommute });
  };

  private changePickupPremisesState = (pickupValue: string): void => {
    let selectedPickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST0;
    switch (pickupValue) {
      case "1":
        selectedPickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST1;
        break;
      case "2":
        selectedPickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST2;
        break;
      case "3":
        selectedPickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST3;
        break;
      default:
    }
    this.setState({
      pickupPremisesList: selectedPickupPremisesList
    });
  };

  public render(): JSX.Element {
    return (
      <Paper component="section" elevation={0}>
        <FormikCheckbox
          name="initial.statusType"
          label="サービス提供実施"
          style={{ marginBottom: 8 }}
          onChange={this.handleChangeStatusHook}
        />
        <FormikCheckbox
          name="initial.otherSupportFlg"
          label="生活介護等または指定通所支援等を実施"
          disabled={!this.state.isCommute}
          style={{ marginBottom: 14 }}
        />
        <FormikSelect
          name="initial.food"
          label="食事提供"
          size="smallMedium"
          disabled={!this.state.isCommute}
          options={SUPPLY_FOOD_SERVICE_LIST}
          style={{ marginBottom: 22, minHeight: 52 }}
          FormLabelClasses={
            !this.state.isCommute
              ? { root: this.props.classes.disabled }
              : undefined
          }
        />
        <FormGroup row>
          <FormikSelect
            name="initial.pickup"
            label="送迎"
            size="smallMedium"
            disabled={!this.state.isCommute}
            options={SUPPLY_PICKUP_SERVICE_LIST}
            onChangeHook={this.handleChangePickupHook}
            style={{ marginBottom: 30, minHeight: 52 }}
            FormLabelClasses={
              !this.state.isCommute
                ? { root: this.props.classes.disabled }
                : undefined
            }
          />
          <FormikSelect
            name="initial.pickupPremises"
            label="同一敷地内送迎"
            size="smallMedium"
            options={this.state.pickupPremisesList}
            disabled={
              !this.state.isCommute ||
              this.props.formikPropsValues.values.initial.pickup === "0"
            }
            style={{ marginBottom: 30, minHeight: 52 }}
            FormLabelClasses={
              !this.state.isCommute ||
              this.props.formikPropsValues.values.initial.pickup === "0"
                ? { root: this.props.classes.disabled }
                : undefined
            }
          />
        </FormGroup>
        <FormikCheckbox
          name="initial.emergencyShorttermFlg"
          label="緊急短期入所受入"
          disabled={!this.state.isCommute}
          style={{ marginBottom: 10 }}
        />
        <FormikCheckbox
          name="initial.overHoursFlg"
          label="単独型18時間以上"
          disabled={!this.state.isCommute}
          style={{ marginBottom: 12 }}
        />
        <FormikSelect
          name="initial.capacityOverrunException"
          label="定員超過特例"
          size="smallMedium"
          options={CAPACITY_OVERRUN_EXCEPTION}
          disabled={!this.state.isCommute}
          style={{ marginBottom: 22, width: 330, minHeight: 52 }}
          FormLabelClasses={
            !this.state.isCommute
              ? { root: this.props.classes.disabled }
              : undefined
          }
        />
        <FormGroup row>
          <FormikSelect
            name="initial.medicalSupportType"
            label="医療連携体制加算"
            size="smallMedium"
            options={MEDICAL_COOPERATION_TEXT}
            disabled={!this.state.isCommute}
            style={{ marginBottom: 30, width: 330, minHeight: 52 }}
            onChangeHook={this.handleChangeMedicalCooperationHook}
            FormLabelClasses={
              !this.state.isCommute
                ? { root: this.props.classes.disabled }
                : undefined
            }
          />
          <FormikCheckbox
            name="initial.sputumImplementationFlg"
            label="喀痰吸引等実施"
            disabled={
              !(
                this.state.isCommute && this.state.enableSputumImplementationFlg
              )
            }
            classes={{ root: this.props.classes.checkbox }}
            style={{ margin: 0, marginTop: 24, height: 24 }}
          />
        </FormGroup>
        <FormikCheckbox
          name="initial.severeDisabilitySupportFlg"
          label="重度障害者支援（基礎研修修了者）"
          disabled={
            !(this.state.isCommute && this.props.isSevereDisabilitySupport)
          }
          style={{ marginBottom: 12 }}
        />
        <FormikTextField
          name="initial.remarks"
          label="備考"
          size="quarterSuperLong"
          style={{ marginBottom: 48, width: 536, minHeight: 52 }}
          error={
            this.props.formikPropsValues.errors &&
            this.props.formikPropsValues.errors.initial
              ? this.props.formikPropsValues.errors.initial.remarks !==
                undefined
              : false
          }
          onChangeHook={this.onChangeText}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(UsagePerformanceReportDialogFields);
