import {
  IKOU_IN_OUT_RECORDS_STATUS_MODAL,
  AB_IN_OUT_RECORDS_STATUS_MODAL
} from "@constants/mgr/IAB/variables";
import { FacilityType } from "@constants/variables";
import { OptionInterface } from "@components/atoms/DropDown";

/**
 * 種別ごとに表示するカラム番号を取得する
 * @param facilityType 種別タイプ
 */
export const displayStatus = (facilityType: FacilityType): number[] => {
  if (facilityType === FacilityType.A) return [2, 3, 4, 5, 6, 7, 10];
  if (facilityType === FacilityType.B) return [2, 3, 4, 5, 6, 7, 10];
  if (facilityType === FacilityType.IKOU) return [2, 5, 6, 7, 8, 9, 10];
  return [];
};

/**
 * 種別の利用実績の一覧を取得
 * @param facilityType
 */
export const getStatusList = (
  facilityType: FacilityType
): OptionInterface[] => {
  const displayStatusList = displayStatus(facilityType);

  let statusList: OptionInterface[] = [];
  switch (facilityType) {
    case FacilityType.A:
    case FacilityType.B:
      statusList = AB_IN_OUT_RECORDS_STATUS_MODAL;
      break;
    case FacilityType.IKOU:
      statusList = IKOU_IN_OUT_RECORDS_STATUS_MODAL;
      break;
  }
  const keyLists = statusList.reduce((obj, status) => {
    obj[status.value] = status;
    return obj;
  }, {});

  const results = displayStatusList
    .map(status => {
      return keyLists[status];
    })
    .filter(v => v !== undefined);
  return results;
};
