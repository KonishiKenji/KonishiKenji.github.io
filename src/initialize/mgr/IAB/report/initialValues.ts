import convertHHMMToMinutes from "@utils/date/convertHHMMToMinutes";
import convertHHMMSSToHHMM from "@utils/date/convertHHMMSSToHHMM";
import {
  dateToLocalisedString,
  formatTime,
  defaultTimeLabel
} from "@/utils/date";
import { IABReport } from "@stores/domain/mgr/IAB/report/types";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { InitialValues } from "@interfaces/mgr/IAB/report/initial";
import { InitialValues as WorkValues } from "@interfaces/mgr/IAB/report/workRecord";
import { Checkbox } from "@constants/variables";

export type InitialDataValues = InitialValues & WorkValues;

// YYYY-MM-DD hh:mm:ddに対応
const getTime = (inTime: string): RegExpExecArray | null => {
  return / [0-1][0-9]:[0-5][0-9]/.exec(inTime)
    ? / [0-1][0-9]:[0-5][0-9]/.exec(inTime)
    : / [2][0-3]:[0-5][0-9]/.exec(inTime);
};

const convertBreakTime = (time: string): number => {
  const hour = /[0-1][0-9]:/.exec(time);
  const minutes = /:[0-5][0-9]:/.exec(time);
  let totalTime = hour ? parseInt(hour.toString().substr(0, 2), 10) * 60 : 0;
  totalTime += minutes ? parseInt(minutes.toString().substr(1.2), 10) : 0;
  return totalTime;
};

// デフォルト値設定
export const initialValues = (
  facility: FacilityState,
  state?: IABReport
): InitialDataValues => {
  let inTime;
  if (state && state.inTime) {
    inTime = getTime(state.inTime);
  }

  let outTime;
  if (state && state.outTime) {
    outTime = getTime(state.outTime);
  }

  const startTime =
    state &&
    state.workRecord &&
    state.workRecord.startTime &&
    convertHHMMSSToHHMM(state.workRecord.startTime);
  const endTime =
    state &&
    state.workRecord &&
    state.workRecord.endTime &&
    convertHHMMSSToHHMM(state.workRecord.endTime);
  const breakTime =
    state &&
    state.workRecord &&
    state.workRecord.breakTime &&
    convertBreakTime(state.workRecord.breakTime);

  let worked =
    state && state.workRecord && state.workRecord.worked
      ? state.workRecord.worked === 1
      : false;

  // 作業の自動入力がONでworkRecordが未設定の時、作業項目は初期設定で開くようにする
  if (
    state &&
    state.defRecordWork === "1" &&
    (!state.workRecord || !state.workRecord.id)
  ) {
    worked = true;
  }

  let didGetFood = "0";
  let travelTime = "0";
  let pickupPremises = "0";
  if (state) {
    // 事業所の食事提供・送迎サービスがONの時のみ、それぞれ利用実績APIの食事提供・送迎を参照
    if (facility.mealSaservedServiceFlag && state.didGetFood) {
      didGetFood = state.didGetFood;
    }
    if (facility.transferServiceFlag && state.travelTime) {
      travelTime = state.travelTime;
    }
    // 同一敷地内送迎: 送迎が設定されている時のみ、値を参照。
    if (
      travelTime !== "0" &&
      state.pickupPremises &&
      state.pickupPremises !== "0"
    ) {
      pickupPremises = state.pickupPremises;
    }
  }

  return {
    initial: {
      name: state && state.name ? state.name : "",
      uifId: state && state.uif_id ? state.uif_id : -1,
      targetDate: state && state.target_date ? state.target_date : "",
      status: state && state.status ? state.status.toString() : "1",
      trialUsageKind:
        state && state.trialUsageKind ? state.trialUsageKind : "1",
      medicalCooperation:
        state && state.medicalCooperation ? state.medicalCooperation : "0",
      lifeSupportHubInDistrictFlg:
        state && state.lifeSupportHubInDistrictFlg
          ? state.lifeSupportHubInDistrictFlg === Checkbox.ON
          : false,
      inTime: inTime ? inTime.toString().trim() : "",
      outTime: outTime ? outTime.toString().trim() : "",
      extended: state && state.extended ? state.extended : "0",
      didGetFood,
      travelTime,
      pickupPremises,
      memo: state && state.memo ? state.memo : "",
      helpInhouseLifeFlg:
        state && state.helpInhouseLifeFlg
          ? state.helpInhouseLifeFlg === Checkbox.ON
          : false,
      helpSocialLifeFlg:
        state && state.helpSocialLifeFlg
          ? state.helpSocialLifeFlg === Checkbox.ON
          : false,
      trainCommuteFlg:
        state && state.trainCommuteFlg
          ? state.trainCommuteFlg === Checkbox.ON
          : false
    },
    workRecord: {
      worked,
      id:
        state && state.workRecord && state.workRecord.id
          ? state.workRecord.id
          : null,
      inoutRecordsId:
        state && state.workRecord && state.workRecord.inoutRecordsId
          ? state.workRecord.inoutRecordsId
          : null,
      startTime: startTime || "",
      endTime: endTime || "",
      breakTime: breakTime ? breakTime.toString().trim() : "",
      totalTime: "",
      memo:
        state && state.workRecord && state.workRecord.memo
          ? state.workRecord.memo
          : "",
      // histories:
      //   state && state.workRecord && state.workRecord.histories
      //     ? state.workRecord.histories
      //     : {}
      histories: (
        (state && state.workRecord && state.workRecord.histories) ||
        []
      ).map((history) => {
        let { beforeValue, afterValue } = {
          ...history
        };
        let originName = history.columnName;
        const { updatedDate } = history;

        if (originName === "start_time" || originName === "end_time") {
          if (originName === "start_time") {
            originName = "作業開始時間";
          } else {
            originName = "作業終了時間";
          }
          if (beforeValue) {
            beforeValue = formatTime(beforeValue);
          } else {
            beforeValue = defaultTimeLabel;
          }
          if (afterValue) {
            afterValue = formatTime(afterValue);
          } else {
            afterValue = defaultTimeLabel;
          }
        } else if (originName === "break_time") {
          originName = "休憩時間";
          if (beforeValue) {
            beforeValue = `${convertHHMMToMinutes(beforeValue)}分`;
          } else {
            beforeValue = "-";
          }
          if (afterValue) {
            afterValue = `${convertHHMMToMinutes(afterValue)}分`;
          } else {
            afterValue = "-";
          }
        } else {
          originName = "";
        }

        return {
          updatedDate:
            updatedDate &&
            dateToLocalisedString(updatedDate, "YYYY年M月D日 HH:mm"),
          columnName: originName,
          changeDetail: `${beforeValue} → ${afterValue}`
        };
      })
    }
  };
};
