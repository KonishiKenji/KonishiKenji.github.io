import * as React from "react";
import { FormikProps } from "formik";
import {
  createStyles,
  withStyles,
  Theme,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InOutReportDialogFields from "./InOutReportDialogFields";
import InOutReportDialogFieldsWorkRecord from "./InOutReportDialogFieldsWorkRecord";
import { InitialDataValues } from "@initialize/mgr/IAB/report/initialValues";
import { UserState } from "@stores/domain/user/type";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import checkTime from "@validator/rules/checkTime";
import roundingMinutes from "@utils/dataNormalizer/roundingMinutes";
import getCorrectWorkRecordTimes from "@utils/domain/facility/getCorrectWorkRecordTimes";
import makeTotalBreakTimeMinutes from "@utils/domain/report/makeTotalBreakTimeMinutes";

const styles = ({ spacing }: Theme): StyleRules =>
  createStyles({ paper: { margin: spacing.unit * 2 } });

type OwnProps = {
  selectedDate: Date;
  formikProps: FormikProps<InitialDataValues>;
  user: UserState;
  facility: FacilityState;
};
type Props = OwnProps & WithStyles<typeof styles>;

// サービス提供の状況（initial.status）に応じてフィールドの編集許可の管理を行う、その初期状態
const initialFieldsStatus = {
  isTrialUsageKindDisplay: false, // 体験利用フィールドの表示
  isTimeInputRequired: true, // 開始時間のrequired属性
  isTimeInputDisabled: true, // 開始時間のdisable属性
  isDidGetFoodDisabled: true, // 食事提供のdisable属性
  isMedicalCooperationDisabled: true, // 医療連携体制のdisable属性
  isTravelTimeDisabled: true, // 送迎のdisable属性
  isPickupPremisesDisabled: true, // 同一敷地内送迎のdisable属性
  isOtherDisabled: true, // その他（在宅時生活支援・社会生活支援・通勤訓練）のdisable属性
  isWorkRecordDisplay: false // 作業時間関連のフィールドの表示
};
type FieldsStatus = typeof initialFieldsStatus;

/**
 * 分割したフィールド全体の状態管理及びブリッジを担当する
 */
const InOutReportDialogContent: React.FC<Props> = (props) => {
  const [fieldsStatus, setFieldsStatus] = React.useState(initialFieldsStatus);
  const { initialValues, values } = props.formikProps;

  /**
   * disabledになったフィールドを初期設定（新規登録時の状態）に戻す
   * 活性化を継続しているものは維持すること
   * initial.memoはdisabled状態がないのとやや特殊なので子で修正している
   * TODO: 現状だとマスター参照をしないと初期設定には戻せないので、時間以外は開いた時の状態に戻している
   */
  const resetDisabledFields = React.useCallback(
    (next: FieldsStatus) => {
      const prev = fieldsStatus;
      const initial = {} as InitialDataValues["initial"];
      const workRecord = {} as InitialDataValues["workRecord"];
      initial.status = values.initial.status;

      if (prev.isTrialUsageKindDisplay && !next.isTrialUsageKindDisplay) {
        initial.trialUsageKind = initialValues.initial.trialUsageKind;
        initial.lifeSupportHubInDistrictFlg =
          initialValues.initial.lifeSupportHubInDistrictFlg;
      }
      if (!prev.isTimeInputDisabled && next.isTimeInputDisabled) {
        initial.inTime = "";
        initial.outTime = "";
      }
      if (!prev.isDidGetFoodDisabled && next.isDidGetFoodDisabled) {
        initial.didGetFood = initialValues.initial.didGetFood;
      }
      if (
        !prev.isMedicalCooperationDisabled &&
        next.isMedicalCooperationDisabled
      ) {
        initial.medicalCooperation = initialValues.initial.medicalCooperation;
      }
      if (!prev.isTravelTimeDisabled && next.isTravelTimeDisabled) {
        initial.travelTime = initialValues.initial.travelTime;
      }
      if (!prev.isPickupPremisesDisabled && next.isPickupPremisesDisabled) {
        initial.pickupPremises =
          values.initial.travelTime === "0"
            ? "0"
            : initialValues.initial.pickupPremises;
      }
      if (!prev.isOtherDisabled && next.isOtherDisabled) {
        initial.helpInhouseLifeFlg = initialValues.initial.helpInhouseLifeFlg;
        initial.helpSocialLifeFlg = initialValues.initial.helpSocialLifeFlg;
        initial.trainCommuteFlg = initialValues.initial.trainCommuteFlg;
      }
      if (!prev.isWorkRecordDisplay && next.isWorkRecordDisplay) {
        workRecord.worked = initialValues.workRecord.worked;
        workRecord.startTime = initialValues.workRecord.startTime;
        workRecord.endTime = initialValues.workRecord.endTime;
        workRecord.breakTime = initialValues.workRecord.breakTime;
        workRecord.memo = initialValues.workRecord.memo;
      }

      // コストが高いので更新は余計な実行を避ける
      if (
        Object.keys(initial).length > 1 ||
        Object.keys(workRecord).length > 0
      ) {
        props.formikProps.setValues({
          initial: { ...values.initial, ...initial },
          workRecord: { ...values.workRecord, ...workRecord }
        });
      }
    },
    [fieldsStatus, initialValues, values]
  );

  const { status, travelTime } = props.formikProps.values.initial;

  /**
   * 現在のinitial.statusに応じたfieldsStatusを決定する
   */
  React.useEffect(() => {
    // 未指定（1）の状態をセットして各種差分を後から指定する
    const nextFieldsStatus = { ...initialFieldsStatus };

    // 通所・施設外就労
    if (status === "2" || status === "3") {
      nextFieldsStatus.isTimeInputDisabled = false;
      nextFieldsStatus.isDidGetFoodDisabled = false;
      nextFieldsStatus.isMedicalCooperationDisabled = false;
      nextFieldsStatus.isTravelTimeDisabled = false;
      nextFieldsStatus.isPickupPremisesDisabled = travelTime === "0";
      nextFieldsStatus.isOtherDisabled = false;
      nextFieldsStatus.isWorkRecordDisplay = true;
    }
    // 施設外支援・移行準備支援Ⅰ・移行準備支援Ⅱ
    else if (status === "4" || status === "8" || status === "9") {
      nextFieldsStatus.isTimeInputRequired = false;
      nextFieldsStatus.isTimeInputDisabled = false;
      nextFieldsStatus.isDidGetFoodDisabled = false;
      nextFieldsStatus.isMedicalCooperationDisabled = false;
      nextFieldsStatus.isTravelTimeDisabled = false;
      nextFieldsStatus.isPickupPremisesDisabled = travelTime === "0";
      nextFieldsStatus.isOtherDisabled = false;
      nextFieldsStatus.isWorkRecordDisplay = true;
    }
    // 欠席時対応・欠席（加算なし）
    else if (status === "5" || status === "10") {
      nextFieldsStatus.isTimeInputRequired = false;
    }
    // 訪問
    else if (status === "6") {
      nextFieldsStatus.isTimeInputDisabled = false;
    }
    // 体験利用
    else if (status === "7") {
      nextFieldsStatus.isTrialUsageKindDisplay = true;
      nextFieldsStatus.isTimeInputRequired = false;
    }

    resetDisabledFields(nextFieldsStatus);
    setFieldsStatus(nextFieldsStatus);
  }, [status, travelTime]);

  const [workRecord, setWorkRecord] = React.useState(() =>
    getCorrectWorkRecordTimes(props.facility, props.selectedDate)
  );

  /**
   * 基準となる作業時間を取得する
   */
  React.useEffect(() => {
    const res = getCorrectWorkRecordTimes(props.facility, props.selectedDate);
    setWorkRecord(res);
  }, [props.selectedDate, props.facility]);

  const { group_labor_charge } = props.user.featureGroup;
  const { startTime, endTime } = props.formikProps.values.workRecord;
  const { unitEngrave } = props.facility;

  /**
   * In,OutTimeの変更を受け取る
   */
  const onChangeInOutTime = React.useCallback(
    (autoCorrectValue: string, fieldName: string) => {
      if (group_labor_charge !== 1 || !!checkTime(autoCorrectValue)) {
        return;
      }
      const { setFieldValue } = props.formikProps;

      // 作業への自動反映処理、一旦ここで処理する
      const isBusinessDay = !!(workRecord.start_time && workRecord.end_time);
      let updateValue = autoCorrectValue;
      let currentStartTime = startTime;
      let currentEndTime = endTime;
      const format = fieldName === "initial.inTime" ? "start" : "end";
      if (isBusinessDay) {
        updateValue = roundingMinutes(autoCorrectValue, unitEngrave, format);
      }
      const preCorrectValue = updateValue.replace(/:/, "");
      if (fieldName === "initial.inTime") {
        if (isBusinessDay) {
          // 設定した基準開始時刻より前なら基準時刻で上書きする
          const st = workRecord.start_time.replace(/:/, "");
          if (preCorrectValue < st) {
            updateValue = workRecord.start_time;
          }
        }
        currentStartTime = updateValue;
        setFieldValue("workRecord.startTime", updateValue);
      } else {
        if (isBusinessDay) {
          // 設定した基準終了時刻より後なら基準時刻で上書きする
          const et = workRecord.end_time.replace(/:/, "");
          if (preCorrectValue > et) {
            updateValue = workRecord.end_time;
          }
        }
        currentEndTime = updateValue;
        setFieldValue("workRecord.endTime", updateValue);
      }

      if (isBusinessDay) {
        // 時刻に含まれる休憩時間を算出してセット
        const minutes = makeTotalBreakTimeMinutes(
          currentStartTime,
          currentEndTime,
          workRecord.break_times,
          unitEngrave
        );
        setFieldValue("workRecord.breakTime", minutes);
      }
    },
    [group_labor_charge, startTime, endTime, unitEngrave, workRecord]
  );

  return (
    <Paper
      classes={{ root: props.classes.paper }}
      component="section"
      elevation={0}
    >
      <InOutReportDialogFields
        fieldsStatus={fieldsStatus}
        formikPropsValues={props.formikProps}
        setFormikFieldValue={props.formikProps.setFieldValue}
        serviceType={props.facility.serviceType}
        isPickupAvailable={props.facility.transferServiceFlag}
        isFoodAvailable={props.facility.mealSaservedServiceFlag}
        onChangeInOutTime={onChangeInOutTime}
      />
      {group_labor_charge === 1 && (
        <InOutReportDialogFieldsWorkRecord
          formikProps={props.formikProps}
          isWorkRecordDisplay={fieldsStatus.isWorkRecordDisplay}
          isTimeInputRequired={fieldsStatus.isTimeInputRequired}
          facility={props.facility}
        />
      )}
    </Paper>
  );
};

export default withStyles(styles)(InOutReportDialogContent);
