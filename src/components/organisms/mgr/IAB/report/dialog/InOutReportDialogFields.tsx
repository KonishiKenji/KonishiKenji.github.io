import * as React from "react";
import ClassNames from "classnames";
import {
  createStyles,
  WithStyles,
  withStyles,
  FormLabel
} from "@material-ui/core";
import {
  FacilityType,
  TRAIL_USAGE_KIND,
  IAB_USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE,
  SUPPLY_FOOD_SERVICE_LIST,
  SUPPLY_PICKUP_SERVICE_LIST,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST0,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST1,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST2,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST3
} from "@constants/variables";
import {
  IKOU_IN_OUT_RECORDS_STATUS_MODAL,
  AB_IN_OUT_RECORDS_STATUS_MODAL
} from "@constants/mgr/IAB/variables";
import { FieldItem } from "@interfaces/ui/form";
import { FormikProps } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikTime from "@components/molecules/FormikTime";
import { InitialDataValues } from "@initialize/mgr/IAB/report/initialValues";
import { StyleRules } from "@material-ui/core/styles";

const styles = (): StyleRules =>
  createStyles({
    disabled: {
      color: "rgba(0, 0, 0, 0.38)"
    },
    checkbox: {
      "& > div > label > span": {
        fontSize: "16px"
      }
    },
    fullWidth: {
      "& > div": {
        width: "100%"
      }
    },
    marginTop: {
      marginTop: 12
    }
  });

interface OwnState {
  fieldsStatus: {
    isTrialUsageKindDisplay: boolean;
    isTimeInputRequired: boolean;
    isTimeInputDisabled: boolean;
    isDidGetFoodDisabled: boolean;
    isMedicalCooperationDisabled: boolean;
    isTravelTimeDisabled: boolean;
    isPickupPremisesDisabled: boolean;
    isOtherDisabled: boolean;
    isWorkRecordDisplay: boolean;
  };
  serviceType: string;
  formikPropsValues: FormikProps<InitialDataValues>;
  isPickupAvailable: boolean;
  isFoodAvailable: boolean;
  onChangeInOutTime: (autoCorrectValue: string, fieldName: string) => void;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

type Props = OwnState & WithStyles<typeof styles>;

interface State {
  readonly pickupPremisesList: FieldItem[];
  readonly pickupValue: string;
  readonly pickupPremisesValue: string;
}

class InOutReportDialogFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { formikPropsValues } = this.props;
    this.state = {
      pickupValue: formikPropsValues.values.initial.travelTime,
      pickupPremisesValue: formikPropsValues.values.initial.pickupPremises,
      pickupPremisesList: SUPPLY_PICKUP_PREMISES_SERVICE_LIST0
    };
  }

  public componentDidMount(): void {
    const { formikPropsValues } = this.props;
    this.changePickupPremisesState(formikPropsValues.values.initial.travelTime);
  }

  /**
   * フィールド操作以外で変更があった時の調整
   */
  public componentDidUpdate(prevProps: Props): void {
    const { travelTime } = this.props.formikPropsValues.values.initial;
    const preTravelTime = prevProps.formikPropsValues.values.initial.travelTime;
    if (travelTime !== preTravelTime) {
      this.changePickupPremisesState(travelTime);
    }
  }

  private handleChangeStatusHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { setFormikFieldValue } = this.props;
    setFormikFieldValue("initial.extended", "0");
    this.changeState(e.target.value);
  };

  /**
   * propsからの追加処理とリアルタイムにバリデーションを行う
   */
  private handleChangeInitialTime = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    beforeValue: string,
    autoCorrectValue: string
  ): string | void => {
    this.props.onChangeInOutTime(autoCorrectValue, event.target.name);
    const { setFormikFieldValue } = this.props;
    setFormikFieldValue(event.target.name, autoCorrectValue);
  };

  private handleChangePickupHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { setFormikFieldValue } = this.props;
    const { pickupValue, pickupPremisesValue } = this.state;
    setFormikFieldValue(
      "initial.pickupPremises",
      e.target.value === pickupValue ? pickupPremisesValue : "0"
    );

    this.changePickupPremisesState(e.target.value);
  };

  private changeState = (status: string): void => {
    const { setFormikFieldValue, formikPropsValues } = this.props;
    const memo = formikPropsValues.values.initial.memo.replace(
      /施設外就労\(実施報告書等添付\)|日報有り\(職場体験実習\)/,
      ""
    );
    // 3,4は施設外就労と施設外支援
    if (status === "3") {
      setFormikFieldValue(
        "initial.memo",
        `${memo}施設外就労(実施報告書等添付)`
      );
    } else if (status === "4" || status === "8") {
      setFormikFieldValue("initial.memo", `${memo}日報有り(職場体験実習)`);
    } else {
      setFormikFieldValue("initial.memo", memo);
    }
  };

  private changePickupPremisesState = (pickupValue: string): void => {
    let pickupPremisesList;
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
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST0;
    }
    this.setState({ pickupPremisesList });
  };

  public render(): JSX.Element {
    const {
      serviceType,
      classes,
      isFoodAvailable,
      isPickupAvailable
    } = this.props;
    const {
      isTrialUsageKindDisplay,
      isTimeInputRequired,
      isTimeInputDisabled,
      isDidGetFoodDisabled,
      isMedicalCooperationDisabled,
      isTravelTimeDisabled,
      isPickupPremisesDisabled,
      isOtherDisabled
    } = this.props.fieldsStatus;
    const { pickupPremisesList }: State = this.state;
    return (
      <>
        <FormGroup row>
          <FormikSelect
            name="initial.status"
            label="サービス提供の状況"
            required
            options={
              serviceType === FacilityType.IKOU
                ? IKOU_IN_OUT_RECORDS_STATUS_MODAL
                : AB_IN_OUT_RECORDS_STATUS_MODAL
            }
            size="smallMedium"
            onChangeHook={this.handleChangeStatusHook}
          />
          {isTrialUsageKindDisplay && (
            <div>
              <FormikSelect
                name="initial.trialUsageKind"
                label="体験利用支援種別"
                required
                options={TRAIL_USAGE_KIND}
                size="medium"
                style={{ marginBottom: 12, width: "335px" }}
              />
              <div className={classes.checkbox}>
                <FormikCheckbox
                  name="initial.lifeSupportHubInDistrictFlg"
                  label="地域生活支援拠点"
                />
              </div>
            </div>
          )}
        </FormGroup>
        <FormGroup row>
          <FormikTime
            name="initial.inTime"
            label="開始時間"
            required={isTimeInputRequired}
            placeholder="00:00"
            size="smallMedium"
            maxLength={5}
            disabled={isTimeInputDisabled}
            onChangeHookTime={this.handleChangeInitialTime}
          />
          <FormikTime
            name="initial.outTime"
            label="終了時間"
            placeholder="00:00"
            size="smallMedium"
            maxLength={5}
            disabled={isTimeInputDisabled}
            onChangeHookTime={this.handleChangeInitialTime}
          />
        </FormGroup>
        {isFoodAvailable && (
          <FormikSelect
            name="initial.didGetFood"
            label="食事提供"
            size="smallMedium"
            disabled={isDidGetFoodDisabled}
            options={SUPPLY_FOOD_SERVICE_LIST}
            FormLabelClasses={
              isDidGetFoodDisabled ? { root: classes.disabled } : undefined
            }
          />
        )}
        <FormikSelect
          name="initial.medicalCooperation"
          label="医療連携体制"
          size="smallMedium"
          disabled={isMedicalCooperationDisabled}
          options={IAB_USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE}
          FormLabelClasses={
            isMedicalCooperationDisabled
              ? { root: classes.disabled }
              : undefined
          }
        />
        {isPickupAvailable && (
          <FormGroup row>
            <FormikSelect
              name="initial.travelTime"
              label="送迎"
              size="smallMedium"
              disabled={isTravelTimeDisabled}
              options={SUPPLY_PICKUP_SERVICE_LIST}
              onChangeHook={this.handleChangePickupHook}
              FormLabelClasses={
                isTravelTimeDisabled ? { root: classes.disabled } : undefined
              }
            />
            <FormikSelect
              name="initial.pickupPremises"
              label="同一敷地内送迎"
              size="smallMedium"
              options={pickupPremisesList}
              disabled={isPickupPremisesDisabled}
              FormLabelClasses={
                isPickupPremisesDisabled
                  ? { root: classes.disabled }
                  : undefined
              }
            />
          </FormGroup>
        )}
        <div className={classes.checkbox}>
          <FormLabel style={{ fontSize: "12px" }}>その他</FormLabel>
          <FormikCheckbox
            name="initial.helpInhouseLifeFlg"
            label="在宅時生活支援"
            disabled={isOtherDisabled}
            style={{ marginTop: "-4px", marginBottom: "0px" }}
          />
          <FormikCheckbox
            name="initial.helpSocialLifeFlg"
            label="社会生活支援"
            disabled={isOtherDisabled}
            style={{ marginTop: "-4px", marginBottom: "0px" }}
          />
          {serviceType === FacilityType.IKOU && (
            <FormikCheckbox
              name="initial.trainCommuteFlg"
              label="通勤訓練"
              disabled={isOtherDisabled}
              style={{ marginTop: "-4px", marginBottom: "0px" }}
            />
          )}
          <div className={ClassNames(classes.fullWidth, classes.marginTop)}>
            <FormikTextField
              name="initial.memo"
              label="備考"
              size="quarterSuperLong"
              style={{ marginBottom: 32 }}
              multiline
            />
          </div>
        </div>
      </>
    );
  }
}
export default withStyles(styles)(InOutReportDialogFields);
